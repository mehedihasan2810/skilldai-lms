import { anthropic } from "@ai-sdk/anthropic";
import { generateObject, streamObject } from "ai";
import { z } from "zod";
import { courseSchema } from "./schema";
import { cookies } from "next/headers";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const maxDuration = 60;

const systemPrompt = `
You are an expert course creator. Your task is to generate a well-structured and detailed course based on the provided topic, grade level, and target audience. The course should consist of:

- A Course Title
- A Short Description (no more than 25 words).
- Maximum 10 Sections, each with a title and highly detailed content, formatted in Markdown. Please don't generate more than 10 sections.
- For each section, include up to 3 quiz questions with answers.
- Make sure the course is engaging, clear, and tailored to the specified audience and difficulty level (beginner, intermediate, or advanced).
- Provide a step-by-step breakdown of concepts to ensure deep understanding.
- Content should be formatted in a way that is easy to follow and digest.
`;

function getUserPrompt(
  courseTopic: string,
  targetAudience: string,
  difficultyLevel: string,
  grade: string
) {
  return `
Generate a comprehensive course on the topic "${courseTopic}" for ${targetAudience} at a ${grade} level. The course should include:

- A course title
- A short description. Please keep the description within 25 words.
- Maximum 10 sections with titles and highly detailed content, breaking down complex ideas and providing clear explanations.
- For each section, include up to 3 quiz questions and answers to reinforce learning.
- The course should be designed to engage the audience, explain concepts thoroughly, and provide a logical progression.
`;
}

export async function POST(req: Request) {
  const {
    courseTopic,
    targetAudience,
    difficultyLevel,
    grade,
    userId,
    userEmail,
  } = await req.json();

  console.log({
    courseTopic,
    targetAudience,
    difficultyLevel,
    grade,
    userId,
    userEmail,
  });

  const supabase = await createClient();

  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();
  const { data: tokenUsage, error } = await supabase
    .from("token_usage")
    .select("total_tokens")
    .eq("user_id", userId)
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

  // Ensure that the required parameters exist in the input data
  if (!courseTopic || !targetAudience || !grade) {
    return new Response("Missing required fields", { status: 400 });
  }

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamObject({
    model: openrouter("openai/gpt-4o"),
    // model: anthropic("claude-3-5-sonnet-20240620"),
    // output: "array",
    schema: courseSchema,
    // prompt: `Generate 1 notifications for a messages app in this context: make one`,
    system: systemPrompt,
    prompt: getUserPrompt(courseTopic, targetAudience, difficultyLevel, grade),
    onFinish: async ({ object, usage }) => {
      console.log("finish");
      console.log(usage);
      console.log(object?.title);

      const { data, error: error } = await supabase
        .from("token_usage")
        .insert({
          type: "course",
          user_id: userId,
          // user_email: userEmail,
          email: userEmail,
          month: CURRENT_MONTH,
          year: CURRENT_YEAR,
          input_token: usage.promptTokens,
          output_token: usage.completionTokens,
          total_tokens: usage.totalTokens,
          llm: "openai",
          model: "gpt-4o",
        })
        .select("total_tokens");

      console.log({ data, error });
    },
  });

  return result.toTextStreamResponse();
}
