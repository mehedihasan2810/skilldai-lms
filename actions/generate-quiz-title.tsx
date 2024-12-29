"use server";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

export const generateQuizTitle = async (fileName: string) => {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const result = await generateObject({
    model: openrouter("google/gemini-flash-1.5"),
    schema: z.object({
      title: z
        .string()
        .describe(
          "A max five word title for the quiz based on the file provided as context",
        ),
    }),
    prompt:
      "Generate a title for a quiz based on the following (PDF) file name. Try and extract as much info from the file name as possible. If the file name is just numbers or incoherent, just return Untitled.\n\n " + fileName,
  });
  return result.object.title;
};