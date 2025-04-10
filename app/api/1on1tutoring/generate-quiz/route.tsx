// app/api/generate-quiz/route.ts
import { streamText, streamObject } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const quizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.string(),
    })
  ),
});

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { subject, proficiency, userEmail, userId ,chatId}: { 
    subject: string; 
    proficiency: string; 
    userEmail: string; 
    userId: string ;
    chatId:string;
  } = await req.json();

  const supabase = await createClient();

  

  const MAX_TOKENS = process.env.NEXT_PUBLIC_MAX_TOKENS;
  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();

  // Fetch current token usage for the user
  const { data: tokenUsage, error } = await supabase
    .from("token_usage")
    .select("total_tokens, input_token, output_token")
    .eq("user_id", userId)
    .eq("month", CURRENT_MONTH)
    .eq("year", CURRENT_YEAR)
    .single();

  // if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
  //   console.error('Error fetching token usage:', error);
  //   return new NextResponse('Internal Server Error', { status: 500 });
  // }

  // Check if token limit is reached
  if ((tokenUsage?.total_tokens || 0) >= (Number(MAX_TOKENS) || 0)) {
    return new NextResponse("Monthly token limit reached", { status: 429 });
  }

  // Initialize OpenRouter client
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  // Generate quiz questions with token tracking
  const result = await streamObject({
    model: openrouter("google/gemini-2.0-flash-001"),
    schema: quizSchema,
    system: `
      You are an educational assistant tasked with creating quizzes.
      Generate 20 ${proficiency} level quiz questions about ${subject}.
      Each question should have 4 options and one correct answer.
      Return the response in the required JSON schema format.
    `,
    prompt: `Generate 10 ${proficiency} level quiz questions about ${subject}. 
      Each question should have 4 options and one correct answer.`,
    experimental_telemetry: {
      isEnabled: true,
      functionId: "quiz-generation",
      metadata: {
        tags: ["quiz-generation", userEmail],
        userId: userEmail,
        sessionId: "quiz-generation",
        user: userEmail,
      },
    },
    onFinish: async ({ object, usage }) => {
      console.log(usage)
      if (!object || !object.questions) {
        console.error("❌ No questions found in AI response.");
        return;
      }

      const { questions } = object;

      // Save quiz to DB
      const { error: insertError } = await supabase.from("quizzes_1on1tutor").insert({
        id: chatId,
        user_id: userId,
        subject,
        proficiency,
        questions,
        email:userEmail,
      });

      if (insertError) {
        console.error("❌ Error inserting quiz:", insertError);
      }
      // Update token usage in Supabase
      const { error: updateError } = await supabase
        .from("token_usage")
        .upsert(
          {
            type: `chat:tutor`,
            user_id: userId,
            user_email: userEmail,
            email: userEmail,
            month: CURRENT_MONTH,
            year: CURRENT_YEAR,
            input_token: (tokenUsage?.input_token || 0) + (usage?.promptTokens || 0),
            output_token: (tokenUsage?.output_token || 0) + (usage?.completionTokens || 0),
            total_tokens: (tokenUsage?.total_tokens || 0) + (usage?.totalTokens || 0),
            llm: "google",
            model: "gemini-2.0-flash-001",
          },
          {
            onConflict: "user_email",
          }
        );

      if (updateError) {
        console.error('Error updating token usage:', updateError);
      }
    },
  });

  return result.toTextStreamResponse();
}

export const runtime = "edge"; // Optional: Run on edge runtime for faster response