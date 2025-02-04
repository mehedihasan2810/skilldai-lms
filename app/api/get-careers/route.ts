import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateObject, streamObject } from "ai";
import { z } from "zod";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { deepseek } from "@ai-sdk/deepseek";

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

Return your answer as an array of objects with the following keys:
- jobTitle: Title of the career (e.g., "Full-Stack Developer").
- jobDescription: A brief description of the career.
- timeline: Suggested timeline for transitioning (e.g., "3-6 months").
- salary: Approximate salary range (e.g., "$85k - $110k").
- difficulty: Difficulty level of making the transition.
- workRequired: Indicate the expected hours or commitment (e.g,  "20-30 hrs/week").
- aboutTheRole: Describe the role and responsibilities.
- whyItsagoodfit: List reasons why this career is a good match.
- roadmap: Provide a roadmap as an array of weekly milestones (e.g., [{"step": "Step description", "description": "Detailed step to transition into the role"}, ...]).

Please suggest at least 6 potential career transitions.
`,
  });

  //   // For each career, generate additional detailed information
  //   const detailedCareerSchema = z.object({
  //     workRequired: z.string(),
  //     aboutTheRole: z.string(),
  //     whyItsagoodfit: z.array(z.string()),
  //     // roadmap: z.array(z.record(z.string())).default([]),
  //     roadmap: z.array(z.object({ step: z.string(), description: z.string() })),
  //   });

  //   const detailedResults = await Promise.all(
  //     careers.map(async (career: any) => {
  //       const {object: details} = await generateObject({
  //         model: openai("gpt-4o"),
  //         schema: detailedCareerSchema,
  //         prompt: `You are a career expert. Provide detailed guidance for transitioning into the role "${career.jobTitle}".

  // Resume:
  // ${resumeInfo}

  // Additional Context:
  // ${context}

  // Guidelines:
  // - workRequired: Indicate the expected hours or commitment.
  // - aboutTheRole: Describe the role and responsibilities.
  // - whyItsagoodfit: List reasons why this career is a good match.
  // - roadmap: Provide a roadmap as an array of weekly milestones (e.g., [{"step": "Step description", "description": "Detailed step to transition into the role"}, ...]).

  //  <example>
  //           {"role": "DevOps Engineer",
  //           "workRequired": "20-30 hrs/week",
  //           "whyItsagoodfit": [
  //             "Leverages your extensive experience in software engineering and developer advocacy.",
  //             "Utilizes your skills in Python, JavaScript, Node.js, React, and cloud services like AWS.",
  //             "Aligns with your experience in building and maintaining large-scale applications and infrastructure.",
  //             "Allows you to continue working with cutting-edge technologies and practices."
  //           ],
  //           "aboutTheRole": "As a DevOps Engineer, you will work closely with development, operations, and QA teams to streamline the software development lifecycle. Your responsibilities will include automating infrastructure provisioning, monitoring system performance, and ensuring security and compliance. The goal is to enhance the efficiency, reliability, and scalability of software deployments.",
  //           "roadmap": [{"step": "Step description", "description": "Detailed step to transition into the role"}]}
  //           </example>

  // `,
  //       });
  //       return { ...career, ...details };
  //     })
  //   );

  return result.toTextStreamResponse();
}
