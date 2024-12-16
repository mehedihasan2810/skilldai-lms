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

  const result = await streamObject({
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
        content: "Summarize the content of this document or image (if it is image the say image and if it is document then say document).",
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

`
You are tasked with summarizing a document into a maximum of 10 bullet points. Here is the document to be summarized:

<document>
{{DOCUMENT}}
</document>

Please follow these instructions to create an effective summary:

1. Read the entire document carefully to understand its main ideas and key points.

2. Identify the most important information, focusing on main topics, key arguments, and essential facts.

3. Condense this information into clear, concise bullet points. Each bullet point should capture a single main idea or key piece of information.

4. Limit your summary to a maximum of 10 bullet points. If the document is short or simple, you may use fewer bullet points, but never exceed 10.

5. Ensure that your bullet points are:
   - Concise: Keep each point brief and to the point.
   - Self-contained: Each bullet should make sense on its own.
   - Informative: Provide substantive information, not just topic headings.
   - Balanced: Represent the overall content of the document proportionally.

6. Use your judgment to determine the appropriate number of bullet points based on the document's length and complexity. For very short documents, you may only need 3-5 bullet points.

7. Avoid repetition. Each bullet point should provide unique information.

8. Use clear, straightforward language. Avoid jargon unless it's essential to understanding the document's content.

9. If the document contains numerical data or statistics, include the most significant figures in your summary.

10. For longer documents, focus on capturing the overarching themes and most crucial details rather than trying to include every minor point.

Present your summary within <summary> tags, with each bullet point on a new line, preceded by a bullet point character (•). For example:

<summary>
• First key point
• Second key point
• Third key point
</summary>

Remember, your goal is to provide a clear, concise, and accurate representation of the document's main ideas and most important information.
`;

const dataUrl = `
data:image/jpeg;base64,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
`;
