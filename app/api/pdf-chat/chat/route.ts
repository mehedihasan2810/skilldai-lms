import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, convertToCoreMessages } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, user_email, userId } = await req.json();

  console.log({ user_email, userId });

  console.log(messages);

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamText({
    // model: openai("gpt-4o"),
    // model: anthropic('claude-3-5-sonnet-20241022'),
    model: google("gemini-1.5-pro-latest"),
    system: "You are a helpful assistant for PDF content.",
    messages: convertToCoreMessages(messages),
    // messages: [
    //   {
    //     role: "user",
    //     content: [
    //       {
    //         type: "text",
    //         text: "What is this document?",
    //       },
    //       {
    //         type: "file",
    //         data: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/quiz-from-doc/299d3d87-8bb7-4527-b9af-137cb14c6914/A_Brief_Introduction_To_AI-NPysQAnDTG.pdf",
    //         mimeType: "application/pdf",
    //       },
    //     ],
    //   },
    // ],
    frequencyPenalty: 0,
    presencePenalty: 0,
    temperature: 0.2,
    onFinish: async ({ finishReason, usage }) => {
      console.log({ finishReason, usage });
    },
  });

  return result.toDataStreamResponse();
}

