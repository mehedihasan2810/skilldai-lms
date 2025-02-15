"use server";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

export const getMockInterviewQNA = async ({
  jobPosition,
  jobDesc,
  jobExperience,
}: {
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
}) => {
  const InputPrompt = `
  You are an expert career coach specializing in interview preparation. 
  Based on the following job details, generate 5 insightful and challenging interview questions along with detailed and helpful answers.
  Consider the job requirements and typical expectations for a candidate with the specified years of experience.

  Job Position: ${jobPosition}
  Job Description: ${jobDesc}
  Years of Experience: ${jobExperience}
  `;
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const { object } = await generateObject({
    model: openrouter("google/gemini-2.0-flash-001"),
    schema: z.object({
      question: z.string().describe("Interview question"),
      answer: z.string().describe("Answer to the interview question"),
    }),
    output: "array",
    prompt: InputPrompt,
  });
  return object;
};
