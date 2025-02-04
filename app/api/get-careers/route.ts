import { NextRequest } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

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

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const {object: careers} = await generateObject({
    model: openai("gpt-4o"),
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
- difficulty: Difficulty level of making the transition.

 <example>
      [
        {
        "jobTitle": "UX Designer",
        "jobDescription": "Creates user-centered design solutions to improve product usability and user experience.",
        "timeline": "3-6 months",
        "salary": "$85k - $110k",
        "difficulty": "Medium"
        },
        {
        "jobTitle": "Digital Marketing Specialist",
        "jobDescription": "Develops and implements online marketing campaigns to drive business growth.",
        "timeline": "2-4 months",
        "salary": "$50k - $70k",
        "difficulty": "Low"
        },
        {
        "jobTitle": "Software Engineer",
        "jobDescription": "Designs, develops, and tests software applications to meet business needs.",
        "timeline": "6-12 months",
        "salary": "$100k - $140k",
        "difficulty": "High"
        },
        {
        "jobTitle": "Business Analyst",
        "jobDescription": "Analyzes business needs and develops solutions to improve operations and processes.",
        "timeline": "3-6 months",
        "salary": "$65k - $90k",
        "difficulty": "Medium"
        },
        {
        "jobTitle": "Cybersecurity Specialist",
        "jobDescription": "Protects computer systems and networks from cyber threats by developing and implementing security protocols.",
        "timeline": "6-12 months",
        "salary": "$80k - $120k",
        "difficulty": "High"
        }
        ]
      </example>
`,
  });

  // For each career, generate additional detailed information
  const detailedCareerSchema = z.object({
    workRequired: z.string(),
    aboutTheRole: z.string(),
    whyItsagoodfit: z.array(z.string()),
    // roadmap: z.array(z.record(z.string())).default([]),
    roadmap: z.array(z.object({ step: z.string(), description: z.string() })),
  });

  const detailedResults = await Promise.all(
    careers.map(async (career: any) => {
      const {object: details} = await generateObject({
        model: openai("gpt-4o"),
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
- roadmap: Provide a roadmap as an array of weekly milestones (e.g., [{"Weeks 1-2": "Task description"}, ...]).

 <example>
          {"role": "DevOps Engineer",
          "workRequired": "20-30 hrs/week",
          "whyItsagoodfit": [
            "Leverages your extensive experience in software engineering and developer advocacy.",
            "Utilizes your skills in Python, JavaScript, Node.js, React, and cloud services like AWS.",
            "Aligns with your experience in building and maintaining large-scale applications and infrastructure.",
            "Allows you to continue working with cutting-edge technologies and practices."
          ],
          "aboutTheRole": "As a DevOps Engineer, you will work closely with development, operations, and QA teams to streamline the software development lifecycle. Your responsibilities will include automating infrastructure provisioning, monitoring system performance, and ensuring security and compliance. The goal is to enhance the efficiency, reliability, and scalability of software deployments.",
          "roadmap": [{"step": "Step description", "description": "Detailed step to transition into the role"}]}
          </example>

`,
      });
      return { ...career, ...details };
    })
  );

  return new Response(JSON.stringify(detailedResults), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}