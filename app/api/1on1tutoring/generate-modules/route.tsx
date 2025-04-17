// app/api/1on1tutoring/generate-modules/route.tsx
import { streamObject } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const ModuleSchema = z.object({
  modules: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      weak: z.boolean(),
      progress: z.number(),
      contents: z.string(),
      practice: z.array(z.string()),
      quiz: z.array(
        z.object({
          question: z.string(),
          options: z.array(z.string()).length(4),
          correct: z.number().min(0).max(3),
        })
      ),
    })
  ),
});

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { subject, proficiency, userEmail, userId, chatId }: {
      subject: string;
      proficiency: string;
      userEmail: string;
      userId: string;
      chatId: string;
    } = await req.json();

    if (!subject || !proficiency || !userEmail || !userId || !chatId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // Check for existing modules
    const { data: existingModules, error: moduleError } = await supabase
      .from('modules_1on1tutor')
      .select('modules')
      .eq('id', chatId)
      .single();

    if (moduleError && moduleError.code !== 'PGRST116') { // PGRST116: no rows found
      console.error('Error checking modules:', moduleError);
      return NextResponse.json({ error: 'Failed to check existing modules' }, { status: 500 });
    }

    if (existingModules?.modules) {
      return NextResponse.json(existingModules);
    }

    const MAX_TOKENS = process.env.NEXT_PUBLIC_MAX_TOKENS;
    const CURRENT_MONTH = new Date().getMonth() + 1;
    const CURRENT_YEAR = new Date().getFullYear();

    // Fetch current token usage
    const { data: tokenUsage, error: tokenError } = await supabase
      .from('token_usage')
      .select('total_tokens, input_token, output_token')
      .eq('user_id', userId)
      .eq('month', CURRENT_MONTH)
      .eq('year', CURRENT_YEAR)
      .single();

    if (tokenError) {
      console.error('Error fetching token usage:', tokenError);
      return NextResponse.json({ error: 'Failed to verify token usage' }, { status: 500 });
    }

    // Check token limit
    if ((tokenUsage?.total_tokens || 0) >= (Number(MAX_TOKENS) || 0)) {
      return NextResponse.json({ error: 'Monthly token limit reached' }, { status: 429 });
    }

    // Fetch chat logs
    const { data: chatLogs, error: chatError } = await supabase
      .from('ai_chat_logs_1on1tutor')
      .select('chat')
      .eq('user_id', userId)
      .eq('quiz_id', chatId)
      .single();

    if (chatError || !chatLogs) {
      console.error('Error fetching chat logs:', chatError);
    }

    // Fetch feedback
    const { data: feedback, error: feedbackError } = await supabase
      .from('feedback_1on1tutor')
      .select('comments')
      .eq('user_id', userId)
      .eq('quiz_id', chatId)
      .single();

    if (feedbackError || !feedback) {
      console.error('Error fetching feedback:', feedbackError);
    }

    // Initialize OpenRouter client
    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // Generate modules
    const result = await streamObject({
      model: openrouter('google/gemini-2.0-flash-001'),
      schema: ModuleSchema,
      system: `
        You are an educational assistant tasked with creating personalized learning modules for ${proficiency}-level ${subject}.
        Analyze the provided chat logs and feedback to identify the user's knowledge gaps and strengths:
        - In chat logs, look for incorrect answers, repeated questions, or topics where the user struggled.
        - In feedback, note explicit comments on weaknesses or areas needing improvement.
        - If no logs or feedback are available, generate general modules suitable for ${proficiency}-level ${subject}.
        Generate 5-8 modules tailored to the user:
        - For each identified weakness, create a module with 'weak: true', 'progress: 0', and:
          - 'contents': Markdown string with 2-5 elaborated paragraphs explaining the topic, external references, documents(if applicable).
          - 'practice': 5-10 exercise prompts targeting the gap area.
          - 'quiz': 5-10 questions with 4 options each, correct option index (0-3), testing the weak area.
        - For strengths or complementary topics, create modules with 'weak: false', estimate 'progress' (0-100) based on performance, and include:
          - 'contents': Markdown string with 3-5  concise paragraphs, 1 code example (if applicable), and 1-2 video references or links as markdown (e.g., "[Tutorial](https://youtu.be/xyz)").
          - 'practice': 5-10 exercises to solidify skills.
          - 'quiz': 5 questions to confirm understanding.
        - Ensure module titles are concise, specific, and relevant to ${subject}.
        - Assign unique 'id' values starting from 1.
        Output must conform to the schema: { modules: [{ id, title, weak, progress, contents, practice, quiz }, ...] }.
        Chat Logs: ${chatLogs?.chat || 'None'}
        Feedback: ${feedback?.comments || 'None'}
      `,
      prompt: `Generate personalized ${proficiency}-level modules for ${subject} based on the analysis.`,
      experimental_telemetry: {
        isEnabled: true,
        functionId: 'module-generation',
        metadata: {
          tags: ['module-generation', userEmail],
          userId: userEmail,
          sessionId: 'module-generation',
          user: userEmail,
        },
      },
      onFinish: async ({ object, usage }) => {
        if (!object || !object.modules) {
          console.error('❌ No modules found in AI response.');
          return;
        }

        // Save modules to DB
        const { error: insertError } = await supabase
          .from('modules_1on1tutor')
          .insert({
            id: chatId,
            user_id: userId,
            subject,
            proficiency,
            modules: object.modules,
            email: userEmail,
          });

        if (insertError) {
          console.error('❌ Error inserting modules:', insertError);
        }

        // Update token usage
        const { error: updateError } = await supabase
          .from('token_usage')
          .upsert(
            {
              type: 'chat:tutor',
              user_id: userId,
              user_email: userEmail,
              email: userEmail,
              month: CURRENT_MONTH,
              year: CURRENT_YEAR,
              input_token: (tokenUsage?.input_token || 0) + (usage?.promptTokens || 0),
              output_token: (tokenUsage?.output_token || 0) + (usage?.completionTokens || 0),
              total_tokens: (tokenUsage?.total_tokens || 0) + (usage?.totalTokens || 0),
              llm: 'google',
              model: 'gemini-2.0-flash-001',
            },
            {
              onConflict: 'user_id,month,year',
            }
          );

        if (updateError) {
          console.error('Error updating token usage:', updateError);
        }

      },
    });

    // Return JSON response
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating modules:', error);
    return NextResponse.json({ error: 'Failed to generate modules' }, { status: 500 });
  }
}

export const runtime = 'edge';