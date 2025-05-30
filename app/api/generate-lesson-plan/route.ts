import { createClient } from "@/lib/supabase/server";
import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
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
    model: openrouter("google/gemini-2.0-flash-001"),
    // model: openrouter("openai/gpt-4o-mini"),
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
    experimental_telemetry: {
      isEnabled: true,
      functionId: "lessonPlan-function",
      metadata: {
        tags: ["lessonPlan", inputData.userEmail],
        userId: inputData.userEmail,
        sessionId: "lessonPlan-session",
        user: inputData.userEmail,
      },
    },
    onFinish: async ({ object, usage }) => {
      const { data, error: error } = await supabase
        .from("token_usage")
        .insert({
          type: "lessonPlan",
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
  focusingOn,
  gradeLevel,
  style,
  duration,
  previousLessonInfo,
}: InputData) => {
  return `
You are an AI assistant tasked with creating a detailed, engaging, and actionable lesson plan based on user input. Your role is to act as an expert educational consultant and curriculum developer. Follow these instructions carefully to generate a high-quality lesson plan:

1. Review the following input variables:

<topic>${topic}</topic>
<focusing_on>${focusingOn}</focusing_on>
<grade_level>${gradeLevel}</grade_level>
<style>${style}</style>
<duration>${duration}</duration>
<previous_lesson_info>${previousLessonInfo}</previous_lesson_info>

2. Create a lesson plan with the following structure:

a) Objectives
b) Beginning of the Lesson
c) Learning/Inquiry
d) Practice/Experience
e) Assessment
f) Summary
g) Homework
h) Resources Required

3. For each section of the lesson plan, follow these guidelines:

a) Objectives: List 2-3 clear, measurable goals for the lesson. Ensure they are appropriate for the topic and grade level.

b) Previous Lesson: If previous_lesson_info is provided, summarize it briefly. If not, skip this section.

c) Beginning of the Lesson: Design an engaging starter activity to introduce the topic. This should be brief but captivating.

d) Learning/Inquiry: Develop the main instructional content delivery with interactive elements. Incorporate the focusing_on aspect if provided.

e) Practice/Experience: Create hands-on or collaborative activities for skill reinforcement. Ensure these align with the lesson objectives.

f) Assessment: Propose methods to assess understanding, such as quizzes, discussions, or projects. Make sure these are appropriate for the grade_level and style.

g) Summary: Provide key takeaways and a concise recap of the lesson.

h) Homework: Suggest assignments to extend learning outside the classroom. Ensure these are age-appropriate and reinforce the lesson objectives.

i) Resources Required: List all materials needed for the lesson, including any technology or specific items for activities.

4. Throughout the lesson plan:
- Maintain a professional yet approachable tone.
- Adapt the content to the specific grade_level provided.
- Incorporate the lesson style if specified.
- Ensure the overall plan fits within the given duration.
- Be creative and thorough, making the lesson plan practical for teachers to implement.

5. Format your output as follows:
- Use clear headings for each section of the lesson plan.
- Present information in a structured, easy-to-read format.
- Use bullet points or numbered lists where appropriate.

Remember to tailor the lesson plan to the specific inputs provided, ensuring it is engaging, age-appropriate, and aligned with the given topic and focus area.
`;
};
