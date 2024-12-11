import { createClient } from "@/lib/supabase/server";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

interface InputData {
  topic: string;
  focusingOn: string;
  gradeLevel: string;
  style: string;
  duration: string;
  previousLessonInfo: string;
  userId: string;
  userEmail: string;
}

const outputSchema = z.object({
  title: z.string().describe("A max eight-word title for the lesson plan."),
  plan: z.string().describe("The actual lesson plan content."),
});

export async function POST(req: Request) {
  const { inputData }: { inputData: InputData } = await req.json();

  console.log({ inputData });

  const systemPrompt = getPrompt({ ...inputData });

  console.log({ systemPrompt });

  const result = await streamObject({
    model: openai("gpt-4o-mini"),
    prompt: systemPrompt,
    // messages: [
    //   {
    //     role: "system",
    //     content:
    //       "You are a teacher. Your job is to take a document, and create a multiple choice test (with 4 questions) based on the content of the document. Each option should be roughly equal in length.",
    //   },
    // ],
    maxTokens: 1000,
    schema: outputSchema,
    // output: "array",
    onFinish: async ({ object, usage }) => {
      const supabase = await createClient();

      const CURRENT_MONTH = new Date().getMonth() + 1;
      const CURRENT_YEAR = new Date().getFullYear();
      const { data, error: error } = await supabase
        .from("token_usage")
        .insert({
          type: "lessonPlan",
          user_id: inputData.userId,
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
  focusingOn,
  gradeLevel,
  style,
  duration,
  previousLessonInfo,
}: InputData) => {
  return `
Prompt for AI Lesson Planner:
"You are an expert educational consultant and curriculum developer. Your task is to create detailed, engaging, and actionable lesson plans based on user input. Each lesson plan should include clear objectives, an overview of the previous lesson if provided, a structured lesson flow, practice activities, assessments, a summary, homework, and required resources. Ensure the tone is professional yet approachable, and adapt the content to the specific inputs provided.

User Inputs:

Lesson Topic: ${topic}
Focusing On (optional): ${focusingOn}
Grade Level (optional): ${gradeLevel}
Lesson Style (optional): ${style}
Lesson Duration (in minutes): ${duration}
Previous Lesson Information (optional): ${previousLessonInfo}
Generate a lesson plan with the following structure:

Objectives: [List 2-3 clear, measurable goals for the lesson.]
Previous Lesson: [Summarize if previous lesson information is provided.]
Beginning of the Lesson: [Engaging starter activity to introduce the topic.]
Learning/Inquiry: [Main instructional content delivery with interactive elements.]
Practice/Experience: [Hands-on or collaborative activities for skill reinforcement.]
Assessment: [Methods to assess understanding, e.g., quizzes, discussions, projects.]
Summary: [Key takeaways and recap of the lesson.]
Homework: [Assignments to extend learning outside the classroom.]
Resources Required: [List all materials needed for the lesson.]

Be creative, thorough, and make the lesson plan practical for teachers to implement."
`;
};
