import { NextRequest } from "next/server";
import { streamObject } from "ai";
import { z } from "zod";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

interface GetCareersRequest {
  resumeInfo: string;
  context: string;
}

export async function POST(request: NextRequest) {
  const { resumeInfo, context } = (await request.json()) as GetCareersRequest;

  const careerSchema = z.object({
    jobTitle: z.string(),
    jobDescription: z.string(),
    timeline: z.string(),
    salary: z.string(),
    difficulty: z.string(),
    workRequired: z.string(),
    aboutTheRole: z.string(),
    whyItsagoodfit: z.array(z.string()),
    // roadmap: z.array(z.record(z.string())).default([]),
    roadmap: z.array(z.object({ step: z.string(), description: z.string() })),
  });

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamObject({
    // model: openai("gpt-4o"),
    model: openrouter("openai/gpt-4o"),
    output: "array",
    schema: careerSchema,
    prompt: `As a career advisor, analyze the following resume and context, and suggest 6 potential career transitions.
    
Resume:
${resumeInfo}

Additional Context:
${context}

Return your answer as an array containing exactly 6 objects. Each object must have the following keys:
- jobTitle: Title of the career (e.g., "Full-Stack Developer").
- jobDescription: A brief description of the career.
- timeline: Suggested timeline for transitioning (e.g., "3-6 months").
- salary: Approximate salary range (e.g., "$85k - $110k").
- difficulty: Difficulty level of making the transition.
- workRequired: Indicate the expected hours or commitment (e.g,  "20-30 hrs/week").
- aboutTheRole: Describe the role and responsibilities.
- whyItsagoodfit: List reasons why this career is a good match.
- roadmap: Provide a roadmap as an array of weekly milestones (e.g., [{"step": "Step description", "description": "Detailed step to transition into the role"}, ...]).

Please suggest exactly 6 potential career transitions.
`,
  });

  return result.toTextStreamResponse();
}
