"use server";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

export const getMockInterviewFeedback = async ({
  userAnswers,
}: {
  userAnswers: {
    question: string;
    userAnswer: string;
  }[];
}) => {
  const mergedPrompt = `
    You are an expert interview coach providing feedback on multiple mock interview answers.

    The user answered the following questions:
    ${userAnswers
      .map(
        ({ question, userAnswer }, index) => `
    (${index + 1}) Question: ${question}
    Answer: ${userAnswer}
    `
      )
      .join("\n")}

    For each question, provide:
    - A rating (1-5)
    - 3-5 sentences of constructive feedback on how to improve the answer
    
    Return an array of objects, each with "rating" and "feedback" fields.
  `;

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  // Expect an array of feedback objects
  const { object } = await generateObject({
    model: openrouter("google/gemini-2.0-flash-001"),
    schema: z.object({
      rating: z
        .number()
        .int()
        .min(1)
        .max(5)
        .describe("Rating for the answer (1-5)"),
      feedback: z
        .string()
        .describe("Constructive feedback for improving the answer"),
    }),
    output: "array",
    prompt: mergedPrompt,
  });

  return object;
};
