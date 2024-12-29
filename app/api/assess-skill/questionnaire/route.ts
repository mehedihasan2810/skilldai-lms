import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const outputSchema = z.object({
  type: z.enum(["multiple-choice", "input"]),
  question: z.string().describe("The question to assess the skill."),
  options: z
    .array(z.string().min(1))
    .min(2)
    .max(4)
    .optional()
    .describe("Optional array of choices for multiple-choice questions."),
});

export async function POST(req: Request) {
  const { skills, skillCategory, userId, userEmail } = await req.json();

  console.log({ skills, skillCategory, userId, userEmail });

  const formattedSkills = skills
    .map(
      (skill: { skill: string; rating: number }) =>
        `${skill.skill} (Rating: ${skill.rating}/10)`
    )
    .join(", ");

  console.log({ formattedSkills });

  const prompt = `
    Generate a maximum of 10 questions to assess the following skills across this category: ${skillCategory}.
    Skills: ${formattedSkills}.
    - Ensure the questions are relevant to both the skill and its category.
    - Some questions should be multiple-choice.
    - Some questions should be open-ended where the user can type their answers.
    - Provide concise and job-relevant questions.
    - Highlight category-specific nuances in the questions when applicable.
    `;

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamObject({
    model: openrouter("openai/gpt-4o-mini"),
    schema: outputSchema,
    maxTokens: 1000,
    prompt,
    output: "array",
    onFinish: async ({ object, usage }) => {
      console.log({ object, usage });
    },
  });

  return result.toTextStreamResponse();
}

const dummyPrompt = `
You are an AI assistant tasked with generating a comprehensive skill assessment analysis based on a user's answers to questions about specific skills. Your goal is to provide valuable insights and recommendations to help the user understand their current skill level and potential career paths.

You will be provided with two inputs:

<user_answers>
{{USER_ANSWERS}}
</user_answers>

<skills_assessed>
{{SKILLS_ASSESSED}}
</skills_assessed>

Using these inputs, generate a detailed analysis following these steps:

1. Skill Analysis:
For each skill in the {{SKILLS_ASSESSED}} list:
a) Evaluate the user's proficiency based on their answers.
b) Identify strengths and areas for improvement.
c) Provide specific recommendations for skill enhancement.

2. Career Paths:
a) Suggest 2-3 relevant career paths based on the assessed skills.
b) For each career path, list relevant skills and skills to develop.

3. Project Ideas:
a) Propose 2-3 project ideas that align with the user's current skill set.
b) For each project, specify relevant skills and potential learning opportunities.

4. Psychological Insights:
a) Infer personality traits based on the user's answers and skill levels.
b) Suggest work style preferences.
c) Identify potential challenges and growth areas.

5. Overall Analysis:
Provide a concise summary of the user's current skill level, potential career directions, and recommendations for growth.

Format your output as follows:

<analysis>
<skill_assessment>
[Include individual skill analyses here]
</skill_assessment>

<career_paths>
[Include suggested career paths here]
</career_paths>

<project_ideas>
[Include project ideas here]
</project_ideas>

<psychological_insights>
[Include psychological insights here]
</psychological_insights>

<overall_analysis>
[Include overall analysis here]
</overall_analysis>
</analysis>

Ensure that your analysis is detailed, constructive, and tailored to the user's specific skills and answers. Use professional language and provide actionable advice throughout the analysis.
`;
