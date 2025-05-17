import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { topic, domain, subdivision, subtopic, userEmail, userId, chatId }: {
      topic: string;
      subtopic: string;
      domain: string;
      subdivision: string;
      userEmail: string;
      userId: string;
      chatId: string;
    } = await req.json();

    // Allow subdivision to be optional
    if (!topic || !domain || !subtopic || !userEmail || !userId || !chatId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // Check for existing modules
    const { data: existingModules, error: moduleError } = await supabase
      .from('sat_courses')
      .select('content')
      .eq('user_id', userId)
      .eq('subtopic', subtopic)
      .eq('domain', domain)
      .eq('subdivision', subdivision)
      .eq('topic', topic)
      .maybeSingle();

      console.log("exiting module : ",existingModules);

    if (moduleError) {
      console.error('Error checking existing modules:', moduleError);
      return NextResponse.json({ error: 'Failed to check existing modules' }, { status: 500 });
    }

    if (existingModules) {
      return NextResponse.json({ content: existingModules.content });
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
      .maybeSingle();

    // if (tokenError) {
    //   console.error('Error fetching token usage:', tokenError);
    //   return NextResponse.json({ error: 'Failed to fetch token usage' }, { status: 500 });
    // }

    // Check token limit
    if ((tokenUsage?.total_tokens || 0) >= (Number(MAX_TOKENS) || 0)) {
      return NextResponse.json({ error: 'Monthly token limit reached' }, { status: 429 });
    }

    // Initialize OpenRouter client
    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // Generate modules using generateText
 const { text, usage } = await generateText({
  model: openrouter("google/gemini-2.0-flash-001"),
  system: `
    You are a top SAT expert and educator. Your task is to explain SAT concepts clearly, using smooth, flowing narrative without any introductory remarks like "Here's your module" or "Sure!". Do not use headings, bullet points, boxes, or code formatting.

    For the given topic, write in a direct and instructional tone. Explain the concept thoroughly and intuitively, as if you're tutoring a motivated student aiming for a top SAT score.

    Focus on:
    - Simple, clear explanations of concepts
    - Examples and intuitive analogies
    - Common mistakes and how to avoid them
    - Smart strategies for answering SAT questions in this area
    - Subtle tips and test-taking tricks

    The response should read like a personalized SAT prep guide—clean, informative, and focused on learning.
  `,
  prompt: `
    Write a detailed and intuitive explanation for the SAT on the following subject:

    Topic: ${topic}
    Subtopic: ${subtopic}
    Subdivision: ${subdivision || 'N/A'}
    Domain: ${domain}

     Do not say "here is your answer" or anything similar. give the content student-focused explanation format. Include examples and tips as part of the explanation.
  `,
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
});

console.log("usgae : ",usage);

    // Save modules to DB
    const { error: insertError } = await supabase
      .from('sat_courses')
      .upsert({
        id: chatId,
        user_id: userId,
        topic,
        subtopic,
        subdivision: subdivision || '',
        domain,
        content: text,
        email: userEmail,
      });

    if (insertError) {
      console.error('Error inserting modules:', insertError);
      return NextResponse.json({ error: 'Failed to save modules' }, { status: 500 });
    }

    // Update token usage
    const { error: updateError } = await supabase
      .from('token_usage')
      .upsert(
        {
          type: 'sat-prep',
          user_id: userId,
          user_email: userEmail,
          email: userEmail,
          month: CURRENT_MONTH,
          year: CURRENT_YEAR,
          input_token: (tokenUsage?.input_token || 0) + (usage?.promptTokens || 0),
          output_token: (tokenUsage?.output_token || 0) + (usage?.completionTokens || 0),
          total_tokens: (tokenUsage?.total_tokens || 0) + (usage?.totalTokens || 0),
          llm: 'google',
          model: 'gemini-flash-2.0',
        },
        {
          onConflict: 'user_email',
        }
      );

    if (updateError) {
      console.error('Error updating token usage:', updateError);
    }

    // Return JSON response
    return NextResponse.json({ content: text });
  } catch (error) {
    console.error('Error generating modules:', error);
    return NextResponse.json({ error: 'Failed to generate modules' }, { status: 500 });
  }
}

export const runtime = 'edge';