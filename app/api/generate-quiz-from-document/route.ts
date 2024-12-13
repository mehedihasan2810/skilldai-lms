import { createClient } from "@/lib/supabase/server";
import { google } from "@ai-sdk/google";
import {  streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const questionSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths."
    ),
  answer: z
    .enum(["A", "B", "C", "D"])
    .describe(
      "The correct answer, where A is the first option, B is the second, and so on."
    ),
});

const questionsSchema = z.array(questionSchema).length(4);

export async function POST(req: Request) {
  const { files, userId,  userEmail } = await req.json();
  const firstFile = files[0].data;

  console.log({ firstFile });

  const result = await streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content:
          "You are a teacher. Your job is to take a document, and create a multiple choice test (with maximum 10 questions) based on the content of the document. Each option should be roughly equal in length.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a multiple choice test based on this document.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    // messages: convertToCoreMessages([
    //   {
    //     role: "system",
    //     content:
    //       "You are a teacher. Your job is to take a document, and create a multiple choice test (with 4 questions) based on the content of the document. Each option should be roughly equal in length.",
    //   },
    //   {
    //     role: "user",
    //     content: "Create a multiple choice test based on this document.",
    //     experimental_attachments: [
    //       {
    //         name: "file",
    //         contentType: 'application/pdf',
    //         url: firstFile
    //       }
    //     ]
    //   }
    //   // {
    //   //   role: "user",
    //   //   content: [
    //   //     {
    //   //       type: "text",
    //   //       text: "Create a multiple choice test based on this document.",
    //   //     },
    //   //     {
    //   //       type: "file",
    //   //       data: firstFile,
    //   //       mimeType: "application/pdf",
    //   //     },
    //   //   ],
    //   // },
    // ]),
    schema: questionSchema,
    output: "array",
    onFinish: async ({ object, usage }) => {
      const supabase = await createClient();

      console.log({object})

      const CURRENT_MONTH = new Date().getMonth() + 1;
      const CURRENT_YEAR = new Date().getFullYear();
      const { data, error: error } = await supabase
        .from("token_usage")
        .insert({
          type: "course",
          user_id: userId,
          email: userEmail,
          month: CURRENT_MONTH,
          year: CURRENT_YEAR,
          input_token: usage.promptTokens,
          output_token: usage.completionTokens,
          total_tokens: usage.totalTokens,
          llm: "google",
          model: "gemini-1.5-pro-latest",
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
