"use server";

import { google } from "@ai-sdk/google";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

export const transcribeMockInterview = async ({
  audioBase64,
}: {
  audioBase64: string;
}) => {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const result = await generateText({
    model: google("gemini-2.0-flash-001"),
    // model: openrouter("openai/whisper-1"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Transcribe the following audio:",
          },
          {
            type: "file",
            data: audioBase64,
            mimeType: "audio/webm",
          },
        ],
      },
    ],
    
  });

  console.log({result})

  return result.text;
};
