import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const outputSchema = z.object({
  skillRadar: z.array(
    z.object({
      skill: z.string().describe("Name of the skill."),
      rating: z.string().describe("Rating of the skill (1-10)."),
    })
  ),
  //   skillRadar: z
  //     .string()
  //     .describe(
  //       "A visual representation of the user's skills, often in a radar chart format."
  //     ),
  skillAnalysis: z
    .string()
    .describe(
      "An in-depth analysis of the user's skills, including strengths and weaknesses."
    ),
  suggestedCareerPaths: z
    .string()
    .describe(
      "Recommended career paths tailored to the user's skill set and potential."
    ),
  projectIdeas: z
    .string()
    .describe(
      "Creative project suggestions to help the user practice and enhance their skills."
    ),
  psychologicalInsights: z
    .string()
    .describe(
      "Insights into the user's personality traits and work preferences based on their inputs."
    ),
  overallAnalysis: z
    .string()
    .describe(
      "A comprehensive summary of the user's current skills and growth opportunities."
    ),
});

export async function POST(req: Request) {
  const { skills, skillCategory, answers, userId, userEmail } =
    await req.json();

  console.log({ skills, skillCategory, answers, userId, userEmail });

  const formatedAnswers = answers
    .map(
      (answer: { answer: string; question: string }, i: number) =>
        `Question ${i + 1}: ${answer.question}\nAnswer ${i + 1}: ${
          answer.answer
        }${answers.length - 1 === i ? "" : "\n\n"}`
    )
    .join("");

  const formattedSkills = skills
    .map(
      (skill: { skill: string; rating: number }) =>
        `${skill.skill} (Rating: ${skill.rating}/10)`
    )
    .join(", ");

  console.log({ formattedSkills, formatedAnswers });

  const prompt = `
You are an AI assistant tasked with generating a comprehensive skill assessment analysis based on a user's answers to questions about specific skills. Your goal is to provide valuable insights and recommendations to help the user understand their current skill level and potential career paths.

You will be provided with two inputs:

<user_answers>
${formatedAnswers}
</user_answers>

<skill_category>
${skillCategory}
</skill_category>

<skills_assessed>
${formattedSkills}
</skills_assessed>

Using these inputs, generate a detailed analysis in markdown format, following these guidelines:

1. **Skill Radar**
   - Rate each skill from 1 to 10 for the radar visualization based on the answers to the provided questions.

2. **Skills**
   - **Skill Analysis**
     - For each skill:
       - **Strengths**: Highlight areas where the user excels.
       - **Areas for Improvement**: Suggest specific areas to work on for each skill.

3. **Suggested Career Paths**
   - List 2-3 career paths relevant to the user's skills.
   - For each career path, include:
     - **Relevant Skills**
     - **Skills to Develop**

4. **Project Ideas**
   - Propose 2-3 project ideas aligned with the user's skills.
   - For each project, include:
     - **Relevant Skills**
     - **Learning Opportunities**

5. **Psychological Insights**
   - **Personality Traits**: Infer personality traits based on user input.
   - **Work Style Preferences**: Suggest work preferences.
   - **Potential Challenges**: Identify challenges the user might face.
   - **Growth Areas**: Suggest areas for personal and professional growth.

6. **Overall Analysis**
   - Provide a concise summary of the user's skills, potential career paths, and recommendations for improvement.

Ensure that your output uses appropriate markdown formatting, such as headings (#, ##, etc.), bold text, and lists, and is professional, clear, and constructive.
`;

  console.log(prompt);

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamObject({
    model: openrouter("openai/gpt-4o-mini"),
    schema: outputSchema,
    maxTokens: 1000,
    prompt,
    // output: "array",
    onFinish: async ({ object, usage }) => {
      console.log({ object, usage });
    },
  });

  return result.toTextStreamResponse();
}
