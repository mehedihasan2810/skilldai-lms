"use server";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

export const getMockInterviewFeedback = async ({
  userAnswer,
  mockQuestion,
}: {
  userAnswer: string;
  mockQuestion: string;
}) => {
  const feedbackPrompt = `
    You are an expert interview coach providing feedback on mock interview answers.

    Question ${mockQuestion}: ${userAnswer}

    Provide a rating (1-5) and constructive feedback (3-5 sentences) on how the user can improve their answer. Focus on clarity, conciseness, and relevance to the question. Highlight specific areas for improvement.
    
    Response should contain rating and feedback field.
    `;

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

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
        .max(280)
        .describe("Constructive feedback for improving the answer"),
    }),
    prompt: feedbackPrompt,
  });

  return object;
};
