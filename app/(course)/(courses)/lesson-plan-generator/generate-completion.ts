"use server";

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { formSchema } from "./_components/lesson-plan-generator-form";
import { z } from "zod";

export async function generateCompletion(input: z.infer<typeof formSchema>) {
  const prompt = getPrompt({
    ...input,
  });

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    maxTokens: 2000,
    prompt,
  });

  return createStreamableValue(result.textStream).value;
}

const getPrompt = ({
  topic,
  focusingOn,
  gradeLevel,
  style,
  duration,
  previousLessonInfo,
}: z.infer<typeof formSchema>) => {
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
