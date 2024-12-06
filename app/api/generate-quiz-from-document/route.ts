import { createClient } from "@/lib/supabase/server";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamObject } from "ai";
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

// {
//   name: 'file-s47.html',
//   contentType: 'text/plain',
//   url: 'data:text/plain;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KPGhlYWQ+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICA8dGl0bGU+TXkgRmlyc3QgV2ViIFBhZ2U8L3RpdGxlPgo8L2hlYWQ+Cjxib2R5PgogICAgPGgxPkhlbGxvLCBXb3JsZCE8L2gxPgogICAgPHA+VGhpcyBpcyBteSBmaXJzdCBIVE1MIHBhZ2UuPC9wPgo8L2JvZHk+CjwvaHRtbD4='
// }

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;

  // console.log({ firstFile });
  // console.log("hellooooooooooooo");

  const result = await streamObject({
    model: google("gemini-1.5-flash-latest"),
    messages: convertToCoreMessages([
      {
        role: "system",
        content:
          "You are a teacher. Your job is to take a document, and create a multiple choice test (with 4 questions) based on the content of the document. Each option should be roughly equal in length.",
      },
      {
        role: "user",
        content: "Create a multiple choice test based on this document.",
        experimental_attachments: [
          {
            name: "pdf",
            contentType: 'application/pdf',
            url: firstFile
          }
        ]
      }
      // {
      //   role: "user",
      //   content: [
      //     {
      //       type: "text",
      //       text: "Create a multiple choice test based on this document.",
      //     },
      //     {
      //       type: "file",
      //       data: firstFile,
      //       mimeType: "application/pdf",
      //     },
      //   ],
      // },
    ]),
    schema: questionSchema,
    output: "array",
    onFinish: async ({ object }) => {
      const res = questionsSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }

      // const supabase = await createClient()

      
    },
  });

  return result.toTextStreamResponse();
}
