import { NextRequest } from "next/server";
import { streamObject } from "ai";
import { z } from "zod";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { google } from "@ai-sdk/google";

export const maxDuration = 60;

interface GetCareersRequest {
  resumeInfo: string;
  context: string;
}

export async function POST(request: NextRequest) {
  const { resumeInfo, context } = (await request.json()) as GetCareersRequest;

  const careerSchema = z.object({
    jobTitle: z
      .string()
      .describe("Title of the potential career (e.g., 'Full-Stack Developer')"),
    jobDescription: z.string().describe("A brief description of the career"),
    timeline: z
      .string()
      .describe("Suggested timeline for transitioning (e.g., '3-6 months')"),
    salary: z
      .string()
      .describe("Approximate salary range (e.g., '$85k - $110k')"),
    difficulty: z
      .string()
      .describe("Difficulty level for making the transition"),
    workRequired: z
      .string()
      .describe("Expected commitment (e.g., '20-30 hrs/week')"),
    aboutTheRole: z
      .string()
      .describe("Detailed description of the role and responsibilities"),
    whyItsagoodfit: z
      .array(z.string().describe("Reason why this career is a good match"))
      .describe("List of reasons why this career is a good fit"),
    roadmap: z
      .array(
        z.object({
          step: z.string().describe("Step description for the roadmap (e.g., '1-2 weeks')."),
          description: z
            .string()
            .describe("Detailed explanation for this step"),
        })
      )
      .describe(
        "Roadmap as an array of weekly milestones for transitioning into the career"
      ),
  });

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamObject({
    model: google('gemini-2.0-flash-001'),
    // model: google('gemini-2.0-flash-lite-preview-02-05'),
    // model: openrouter("google/gemini-2.0-flash-lite-preview-02-05:free"),
    // model: openrouter("openai/gpt-4o-mini"),
    output: "array",
    schema: careerSchema,
    prompt: `As a career advisor, carefully examine the following resume and additional context, then propose exactly 6 potential career transitions.

Resume:
${resumeInfo}

Additional Context:
${context}

Return your answer as a JSON array containing exactly 6 objects. Each object must include:
- jobTitle: Title of the career.
- jobDescription: A brief description of the career.
- timeline: Suggested timeline for the transition.
- salary: Approximate salary range.
- difficulty: Difficulty level of the transition.
- workRequired: Expected hours or commitment required.
- aboutTheRole: Description of the role and responsibilities.
- whyItsagoodfit: Reasons why the career is a good match.
- roadmap: An array of weekly milestones with each milestone having "step" and "description" properties.

Ensure the result strictly adheres to this schema.
`,
    onFinish: ({ usage }) => {
      console.log({ usage });
    },
  });

  return result.toTextStreamResponse();
}
