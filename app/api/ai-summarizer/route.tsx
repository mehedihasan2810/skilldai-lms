import { createClient } from "@/lib/supabase/server";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamObject, streamText } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const outputSchema = z.object({
  // title: z.string().describe("A max eight-word title for the summary."),
  summary: z.string().describe("A concise summary of the document/image."),
});

export async function POST(req: Request) {
  const { files, userId, userEmail } = await req.json();
  const firstFile = files[0] as { name: string; type: string; data: string };

  console.log(files);

  console.log({ firstFile, userId, userEmail });

  const result = streamObject({
    model: anthropic("claude-3-5-sonnet-20240620"),
    // model: openai("gpt-4o-mini"),
    // model: google("gemini-1.5-pro-latest"),
    schema: outputSchema,
    maxTokens: 1000,
    messages: convertToCoreMessages([
      {
        role: "system",
        content: systemPrompt,
        // content:
        //   "You are an expert summarizer. Your job is to take a document and provide a concise summary of its content. Ensure the summary captures the main points and key details while being clear and easy to understand.",
      },
      {
        role: "user",
        content:
          "Summarize the content of this document or image (if it is image then say image and if it is document then say document).",
        experimental_attachments: [
          {
            name: firstFile.name,
            contentType: firstFile.type,
            url: firstFile.data,
          },
        ],
      },
    ]),
    // messages: [
    //   {
    //     role: "system",
    //     content: systemPrompt,
    //     // content:
    //     //   "You are an expert summarizer. Your job is to take a document and provide a concise summary of its content. Ensure the summary captures the main points and key details while being clear and easy to understand.",
    //   },
    //   {
    //     role: "user",
    //     content: [
    //       {
    //         type: "text",
    //         text: "Summarize the content of this document.",
    //       },
    //       {
    //         type: "file",
    //         data: firstFile,
    //         mimeType: "application/pdf",
    //       },
    //     ],
    //   },
    // ],
    onFinish: async ({ object, usage }) => {
      const supabase = await createClient();

      console.log({ object, usage });

      const CURRENT_MONTH = new Date().getMonth() + 1;
      const CURRENT_YEAR = new Date().getFullYear();
      const { data, error: error } = await supabase
        .from("token_usage")
        .insert({
          type: "summary",
          user_id: userId,
          // user_email: userEmail,
          email: userEmail,
          month: CURRENT_MONTH,
          year: CURRENT_YEAR,
          input_token: usage.promptTokens,
          output_token: usage.completionTokens,
          total_tokens: usage.totalTokens,
          llm: "anthropic",
          model: "claude-3-5-sonnet-20240620",
        })
        .select("total_tokens");

      console.log({ data, error });
    },
  });

  return result.toTextStreamResponse();
}

const systemPrompt = `
You are an expert summarizer tasked with creating a detailed and well-structured summary of a given document/image/image. Your goal is to capture the main points and key details while ensuring the summary is clear, concise, and easy to understand. Follow these steps to create your summary:

1. Carefully read and analyze the document/image.

2. As you analyze the document/image, pay attention to:
   - The main topic or central theme
   - Key arguments or points
   - Supporting evidence or examples
   - Any significant conclusions or implications

3. Create a detailed summary that:
   - Captures the essence of the document/image in a concise manner
   - Includes all major points and relevant supporting details
   - Maintains the logical flow and structure of the original document/image
   - Uses clear and accessible language

4. Format your summary using the following structure:
   a. Start with a brief overview paragraph that introduces the main topic and purpose of the document/image.
   b. Use headings to separate main sections or themes of the document/image.
   c. Under each heading, use bullet points to list key points, arguments, or examples.
   d. If applicable, include a final paragraph that summarizes the document's/image's conclusions or implications.

5. After creating your initial summary, review it to ensure:
   - All crucial information is included
   - The summary is coherent and flows logically
   - There is no unnecessary or redundant information
   - The language is clear and concise

6. Refine your summary as needed based on your review.

Remember, your goal is to provide a comprehensive yet concise summary that allows readers to quickly grasp the main points and key details of the original document/image.
`;
