import { createClient } from "@/lib/supabase/server";
import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

interface InputData {
  topic: string;
  gradeLevel: string;
  difficulty: string;
  numOfQuestions: string;
  userId: string;
  userEmail: string;
}

const outputSchema = z.object({
  title: z.string().describe("A max eight-word title for the worksheets."),
  worksheets: z.string().describe("The worksheets content for the teachers."),
});

export async function POST(req: Request) {
  const { inputData }: { inputData: InputData } = await req.json();

  console.log({ inputData });

  const supabase = await createClient();

  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();
  const { data: tokenUsage, error } = await supabase
    .from("token_usage")
    .select("total_tokens")
    .eq("user_id", inputData.userId)
    .eq("month", CURRENT_MONTH)
    .eq("year", CURRENT_YEAR);

  const totalTokens = (tokenUsage ?? []).reduce(
    (acc, token) => acc + token.total_tokens,
    0
  );

  console.log({ tokenUsage, totalTokens });

  const MAX_TOKENS = process.env.NEXT_PUBLIC_MAX_TOKENS;

  if (totalTokens > (Number(MAX_TOKENS) || 0)) {
    return new Response("Monthly token limit reached", { status: 429 });
  }

  const systemPrompt = getPrompt({ ...inputData });

  console.log({ systemPrompt });

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamObject({
    // model: openrouter("google/gemini-2.0-flash-001"),
    // model: openrouter("openai/gpt-4o-mini"),
    model: openrouter("google/gemini-2.0-flash-001"),
    prompt: systemPrompt,
    maxTokens: 1000,
    schema: outputSchema,
    // output: "array",
    experimental_telemetry: {
      isEnabled: true,
      functionId: "worksheetGenerator-function",
      metadata: {
        // langfuseTraceId: "trace-123", // Langfuse trace
        tags: ["worksheetGenerator", inputData.userEmail],
        userId: inputData.userEmail,
        sessionId: "worksheetGenerator-session",
        user: inputData.userEmail,
      },
    },
    onFinish: async ({ object, usage }) => {
      const { data, error: error } = await supabase
        .from("token_usage")
        .insert({
          type: "worksheet",
          user_id: inputData.userId,
          // user_email: inputData.userEmail,
          email: inputData.userEmail,
          month: CURRENT_MONTH,
          year: CURRENT_YEAR,
          input_token: usage.promptTokens,
          output_token: usage.completionTokens,
          total_tokens: usage.totalTokens,
          llm: "openai",
          model: "gpt-4o-mini",
        })
        .select("total_tokens");

      console.log({ data, error });
      // const res = questionsSchema.safeParse(object);
      // if (res.error) {
      //   throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      // }
    },
  });

  return result.toTextStreamResponse();
}

const getPrompt = ({
  topic,
  numOfQuestions,
  gradeLevel,
  difficulty,
}: InputData) => {
  return `
You are an AI assistant tasked with generating educational worksheets for teachers. Your goal is to create a comprehensive and engaging worksheet based on the provided input. Follow these instructions carefully:

1. You will receive the following inputs:

<subject_topic>
${topic}
</subject_topic>

<grade_level>
${gradeLevel}
</grade_level>

<difficulty_level>
${difficulty}
</difficulty_level>

<num_questions>
${numOfQuestions}
</num_questions>

2. Create a worksheet that is appropriate for the given subject/topic, grade level and difficulty level. The worksheet should contain the specified number of questions, plus one creative task.

3. Guidelines for worksheet creation:
   - Ensure all content is age-appropriate and aligned with typical curricula for the specified grade level and difficulty level.
   - Use clear, concise language that students can easily understand.
   - Include a variety of question types (e.g., multiple choice, true/false, fill-in-the-blank, short answer).
   - Make the worksheet engaging and, where appropriate, include real-world applications of the subject matter.

5. Include the following components in your worksheet:
   a. Introduction: Write a brief introduction (2-3 sentences) explaining the purpose of the worksheet.
   b. Questions: Generate the specified number of questions. Number each question.
   c. Creative Task: Include one creative task that encourages critical thinking or application of the learned concepts.
   d. Answer Key: Provide an answer key for all questions and the creative task.

6. Specific instructions for each component:
   a. Questions:
      - Vary the difficulty level, with some easier questions and some more challenging ones.
      - For math worksheets, include word problems and numerical problems.
      - For language arts, include grammar, vocabulary, and comprehension questions.
      - For science and social studies, focus on key concepts and facts.
   
   b. Creative Task:
      - Design a task that requires students to apply their knowledge in a creative way.
      - This could involve drawing, writing, or problem-solving.
   
   c. Answer Key:
      - Provide clear, concise answers for each question.
      - For open-ended questions or creative tasks, provide guidelines for acceptable answers.

7. Before finalizing your worksheet, review it to ensure:
   - All content is accurate and grade-appropriate and difficulty-appropriate.
   - The worksheet flows logically and is well-organized.
   - There are no spelling or grammatical errors.

Remember, your goal is to create an educational, engaging, and age-appropriate worksheet that will be valuable for both teachers and students.
`;
};
// const getPrompt = ({ topic, numOfQuestions, gradeLevel }: InputData) => {
//   return `
// You are a highly intelligent and creative assistant for teachers, specializing in generating educational worksheets. Based on the provided subject, topic, grade level, and number of questions, your task is to create an engaging, age-appropriate, and comprehensive worksheet for students. Include the following sections in your response:

// Introduction: A brief overview of the worksheet and its objectives.
// Questions: Provide the specified number of questions tailored to the subject and grade level. Questions should be diverse, including multiple-choice, true/false, fill-in-the-blank, descriptive, and creative tasks where applicable.
// Creative Task: Include one creative and interactive task to engage students, such as drawing or a hands-on activity.
// Answer Key: Provide answers for all the questions in a separate section.
// Formatting Guidelines:
// Label each section clearly (e.g., "Math Worksheet," "Introduction," "Questions," etc.).
// Ensure questions are challenging yet age-appropriate.
// If grade level is not specified, create questions for a general student audience.
// Limit the number of questions to a maximum of 20.
// Make the worksheet visually appealing and easy to read.
// Generate worksheets in this format for the following inputs:
// Subject or Topic: ${topic}
// Grade Level: ${gradeLevel}
// Number of questions: ${numOfQuestions}
// `;
// };
