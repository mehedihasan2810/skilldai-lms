"use server";

import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const generateQuizTitle = async (fileName: string) => {
  const result = await generateObject({
    model: google("gemini-1.5-flash-latest"),
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