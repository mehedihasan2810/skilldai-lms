import { createClient } from "@/lib/supabase/server";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const questionSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths."
    ),
  answer: z
    .enum(["A", "B", "C", "D"])
    .describe(
      "The correct answer, where A is the first option, B is the second, and so on."
    ),
});

const questionsSchema = z.array(questionSchema).length(4);

export async function POST(req: Request) {
  const { files, userId, userEmail } = await req.json();

  const supabase = await createClient();

  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();
  const { data: tokenUsage, error } = await supabase
    .from("token_usage")
    .select("total_tokens")
    .eq("user_id", userId)
    .eq("month", CURRENT_MONTH)
    .eq("year", CURRENT_YEAR);

  const totalTokens = (tokenUsage ?? []).reduce(
    (acc, token) => acc + token.total_tokens,
    0
  );

  console.log({ tokenUsage, totalTokens });

  const MAX_TOKENS = process.env.NEXT_PUBLIC_MAX_TOKENS;

  if (totalTokens > (Number(MAX_TOKENS) || 0)) {
    return new Response("Monthly token limit reached", { status: 429 });
  }

  const firstFile = files[0].data;

  console.log({ firstFile });

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamObject({
    model: anthropic("claude-3-5-sonnet-20241022"),
    // model: openrouter("anthropic/claude-3.5-sonnet"),
    // model: openai("gpt-4o-mini"),
    // model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content:
          "You are a teacher. Your job is to take a document, and create a multiple choice test (with maximum 10 questions) based on the content of the document. Each option should be roughly equal in length.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a multiple choice test based on this document.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
   
    schema: questionSchema,
    output: "array",
    experimental_telemetry: {
      isEnabled: true,
      functionId: "quizGenerator-function",
      metadata: {
        tags: ["quizGenerator", userEmail],
        userId: userEmail,
        sessionId: "quizGenerator-session",
        user: userEmail,
      },
    },
    onFinish: async ({ object, usage }) => {
      console.log({ object });

      const { data, error: error } = await supabase
        .from("token_usage")
        .insert({
          type: "course",
          user_id: userId,
          // user_email: userEmail,
          email: userEmail,
          month: CURRENT_MONTH,
          year: CURRENT_YEAR,
          input_token: usage.promptTokens,
          output_token: usage.completionTokens,
          total_tokens: usage.totalTokens,
          llm: "anthropic",
          model: "claude-3.5-sonnet",
        })
        .select("total_tokens");

      console.log({ data, error });

      // const res = questionsSchema.safeParse(object);
      // if (res.error) {
      //   throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      // }
    },
  });

  return result.toTextStreamResponse();
}
