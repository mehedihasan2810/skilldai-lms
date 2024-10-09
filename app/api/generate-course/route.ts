import { anthropic } from "@ai-sdk/anthropic";
import { generateObject, StreamData, streamObject } from "ai";
import { z } from "zod";
import { courseSchema } from "./schema";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 60;

// Define your schema outside for clarity

// Improved system prompt
const systemPrompt = `
You are an expert course creator. Your task is to generate a well-structured course based on the provided topic, difficulty level, and target audience. The course should consist of:

- A Course Title
- A Short Description (no more than 25 words). Please keep the description within 25 words.
- Maximum 10 Sections, each with a title and detailed content. Please don't generate more than 10 sections.
- For each section, include up to 3 quiz questions with answers. 
- Make sure the course is engaging, clear, and tailored to the specified audience and difficulty level (beginner, intermediate, or advanced).
- Format the content in a way that is easy to follow and provides step-by-step learning.
`;

// Dynamic user prompt
function getUserPrompt(
  courseTopic: string,
  targetAudience: string,
  difficultyLevel: string
) {
  return `
Generate a course on the topic "${courseTopic}" for ${targetAudience} at a ${difficultyLevel} level. The course should include:

- A course title
- A short description. Please keep the description within 25 words.
- Maximum 10 sections with titles and detailed content.
- For each section, include up to 3 quiz questions and answers
- The course should be designed to engage the audience, explain concepts in detail, and follow a clear progression.
`;
}

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { courseTopic, targetAudience, difficultyLevel } = await req.json();

  // Validate input data (if needed)
  // You can define a separate Zod schema for input validation if required

  console.log({ courseTopic, targetAudience, difficultyLevel });

  // Ensure that the required parameters exist in the input data
  if (!courseTopic || !targetAudience || !difficultyLevel) {
    return new Response("Missing required fields", { status: 400 });
  }

  const streamData = new StreamData();

  const result = await streamObject({
    model: openai("gpt-4o-mini"),
    // model: anthropic("claude-3-5-sonnet-20240620"),
    // output: "array",
    schema: courseSchema,
    // prompt: `Generate 1 notifications for a messages app in this context: make one`,
    system: systemPrompt,
    prompt: getUserPrompt(courseTopic, targetAudience, difficultyLevel),
    onFinish: async ({ object, usage }) => {
      console.log("finish");
      console.log(usage);
      console.log(object?.title);

      const { data: course, error: courseError } = await supabase
        .from("course_token_usage")
        .insert({
          course_title: object?.title ?? "",
          course_description: object?.description ?? "",
          input_token: usage.promptTokens,
          output_token: usage.completionTokens,
          total_token: usage.totalTokens,
        })
        .select("id")
        .single();

      console.log({ course, courseError });

      // console.log("object  titlee", object?.title);
      // const generatedCourse = object!;

      // const { data: course, error: courseError } = await supabase
      //   .from("courses")
      //   .insert({
      //     title: generatedCourse.title,
      //     description: generatedCourse.description,
      //   })
      //   .select("*")
      //   .single();

      // if (courseError) {
      //   console.error("Error inserting course:", courseError);
      //   throw new Error("Failed to insert course");
      //   // return new Response("Failed to insert course", { status: 500 });
      // }

      // const sections = generatedCourse.sections;

      // // Loop through sections and insert them into the database
      // for (const section of sections) {
      //   const { title: sectionTitle, content, quizzes } = section;

      //   // Insert each section
      //   const { data: insertedSection, error: sectionError } = await supabase
      //     .from("course_sections")
      //     .insert({
      //       course_id: course.id,
      //       title: sectionTitle,
      //       content,
      //     })
      //     .select("*")
      //     .single();

      //   if (sectionError) {
      //     console.error("Error inserting section:", sectionError);
      //     throw new Error("Failed to insert section");
      //     // return new Response("Failed to insert section", { status: 500 });
      //   }

      //   // Insert quizzes for each section
      //   for (const quiz of quizzes) {
      //     const { question, options, answer } = quiz;

      //     const { error: quizError } = await supabase
      //       .from("course_quizzes")
      //       .insert({
      //         section_id: insertedSection.id,
      //         question,
      //         options,
      //         answer,
      //       });

      //     if (quizError) {
      //       console.error("Error inserting quiz:", quizError);
      //       throw new Error("Failed to insert quiz");
      //       // return new Response("Failed to insert quiz", { status: 500 });
      //     }
      //   }
      // }
    },
  });

  return result.toTextStreamResponse();
}

// import { anthropic } from "@ai-sdk/anthropic";
// import {
//   streamObject,
// } from "ai";
// import { z } from "zod";

// export const maxDuration = 60;

// export async function POST(req: Request) {
//   const data = await req.json();

//   console.log({ data });

//   const result = await streamObject({
//     model: anthropic("claude-3-5-sonnet-20240620"),
//     output: "array",
//     schema: z.object({
//         title: z.string().describe("Title of the course."),
//         description: z.string().describe("Description of the course."),
//         sections: z.array(
//           z.object({
//             title: z.string().describe("Title of the section."),
//             content: z.string().describe("Content of the section."),
//             quizzes: z.array(
//               z.object({
//                 question: z.string().describe("The question of the quiz."),
//                 options: z.string().array().describe("The four options of the quiz question."),
//                 answer: z.string().describe("The answer of the quiz question.")
//               })
//             ).describe("The array of three quizzes."),
//           })
//         ).describe("The five sections of the course."),
//       }),
//     system: `
// You are an expert course creator. Your task is to generate a structured course based on the provided topic, difficulty level, and target audience. The course should consist of:

// - A Course Title
// - A Short Description (no more than 100 words)
// - A minimum of 5 and a maximum of 10 sections, each with a title and detailed content.
// - The section content should be in Markdown format (including code snippets, headers, lists, etc.).
// - For each section, include up to 5 quiz questions and answers.
// - Make sure the course is engaging, clear, and tailored to the specified audience and difficulty level (beginner, intermediate, or advanced).
// - Use Markdown formatting for the section content where needed, especially when code examples or technical explanations are involved.
// - Generate the appropriate number of sections based on the complexity of the topic
// `,
//     prompt: `
// Generate a course on the topic "{Course Topic}" for {Target Audience} at a {Difficulty Level} level. The course should contain:

// - A course title
// - A short description
// - Between 5 and 10 sections, with each section having a title and detailed content
// - The section content should be formatted in Markdown, including code snippets, lists, and other Markdown elements
// - For each section, include up to 5 quiz questions and answers
// `,
//   });

//   return result.toTextStreamResponse();
// }
