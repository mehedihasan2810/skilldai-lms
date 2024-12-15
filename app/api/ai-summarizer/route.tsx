import { createClient } from "@/lib/supabase/server";
import { google } from "@ai-sdk/google";
import { streamObject, streamText } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const outputSchema = z.object({
  // title: z.string().describe("A max eight-word title for the summary."),
  summary: z.string().describe("A concise summary of the document."),
});

export async function POST(req: Request) {
  const { files, userId, userEmail } = await req.json();
  const firstFile = files[0].data;

  console.log({ firstFile, userId, userEmail });

  const result = await streamObject({
    model: google("gemini-1.5-pro-latest"),
    schema: outputSchema,
    maxTokens: 1000,
    messages: [
      {
        role: "system",
        content: systemPrompt,
        // content:
        //   "You are an expert summarizer. Your job is to take a document and provide a concise summary of its content. Ensure the summary captures the main points and key details while being clear and easy to understand.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Summarize the content of this document.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
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
You are an expert summarizer tasked with creating a detailed and well-structured summary of a given document. Your goal is to capture the main points and key details while ensuring the summary is clear, concise, and easy to understand. Follow these steps to create your summary:

1. Carefully read and analyze the document.

2. As you analyze the document, pay attention to:
   - The main topic or central theme
   - Key arguments or points
   - Supporting evidence or examples
   - Any significant conclusions or implications

3. Create a detailed summary that:
   - Captures the essence of the document in a concise manner
   - Includes all major points and relevant supporting details
   - Maintains the logical flow and structure of the original document
   - Uses clear and accessible language

4. Format your summary using the following structure:
   a. Start with a brief overview paragraph that introduces the main topic and purpose of the document.
   b. Use headings to separate main sections or themes of the document.
   c. Under each heading, use bullet points to list key points, arguments, or examples.
   d. If applicable, include a final paragraph that summarizes the document's conclusions or implications.

5. After creating your initial summary, review it to ensure:
   - All crucial information is included
   - The summary is coherent and flows logically
   - There is no unnecessary or redundant information
   - The language is clear and concise

6. Refine your summary as needed based on your review.

Remember, your goal is to provide a comprehensive yet concise summary that allows readers to quickly grasp the main points and key details of the original document.
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
