"use server";

import { deepseek } from "@ai-sdk/deepseek";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

export const generateQuizTitle = async (text: string) => {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const result = await generateObject({
    model: deepseek("deepseek-chat"),
    // model: openrouter("google/gemini-flash-1.5"),
    schema: z.object({
      title: z
        .string()
        .describe(
          "A max five word title for the quiz based on the text provided as context",
        ),
    }),
    prompt:
      "Generate a title for a quiz based on the following text. Try and extract as much info from the text as possible. If the text is just numbers or incoherent, just return Untitled.\n\n " + text,
  });
  return result.object.title;
};