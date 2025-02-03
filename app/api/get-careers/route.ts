import { NextRequest } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

interface GetCareersRequest {
  resumeInfo: string;
  context: string;
}

export async function POST(request: NextRequest) {
  const { resumeInfo, context } = (await request.json()) as GetCareersRequest;

  // Generate initial career paths list
  const careerSchema = z.object({
    jobTitle: z.string(),
    jobDescription: z.string(),
    timeline: z.string(),
    salary: z.string(),
    difficulty: z.string(),
  });

  const {object: careers} = await generateObject({
    model: openai('gpt-4o'),
    output: 'array',
    schema: careerSchema,
    prompt: `As a career advisor, analyze the following resume and context, and suggest 6 potential career transitions.
    
Resume:
${resumeInfo}

Additional Context:
${context}

Return your answer as an array of JSON objects with the following keys:
- jobTitle: Title of the career.
- jobDescription: A brief description of the career.
- timeline: Suggested timeline for transitioning.
- salary: Approximate salary range.
- difficulty: Difficulty level of making the transition.`,
  });

  // For each career, generate additional detailed information
  const detailedCareerSchema = z.object({
    workRequired: z.string(),
    aboutTheRole: z.string(),
    whyItsagoodfit: z.array(z.string()),
    roadmap: z.array(z.record(z.string())),
  });

  const detailedResults = await Promise.all(
    careers.map(async (career: any) => {
      const details = await generateObject({
        model: openai('gpt-4o'),
        schema: detailedCareerSchema,
        prompt: `You are a career expert. Provide detailed guidance for transitioning into the role "${career.jobTitle}".
        
Resume:
${resumeInfo}

Additional Context:
${context}

Guidelines:
- workRequired: Indicate the expected hours or commitment.
- aboutTheRole: Describe the role and responsibilities.
- whyItsagoodfit: List reasons why this career is a good match.
- roadmap: Provide a roadmap as an array of weekly milestones (e.g., [{"Weeks 1-2": "Task description"}, ...]).`,
      });
      return { ...career, ...details };
    })
  );

  return new Response(JSON.stringify(detailedResults), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}