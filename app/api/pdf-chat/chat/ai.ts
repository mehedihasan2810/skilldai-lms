import {
  embed,
  Experimental_LanguageModelV1Middleware,
  generateObject,
  generateText,
} from "ai";
import { z } from "zod";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";
import { deepseek } from "@ai-sdk/deepseek";

const selectionSchema = z.object({
  data: z.object({
    userId: z.string(),
    fileUrl: z.string(),
    pdfChatId: z.string(),
  }),
});

const ragMiddleware: Experimental_LanguageModelV1Middleware = {
  transformParams: async ({ params }) => {
    // const session = await auth();

    // if (!session) return params; // no user session

    const { prompt: messages, providerMetadata } = params;

    // validate the provider metadata with Zod:
    const { success, data } = selectionSchema.safeParse(providerMetadata);

    if (!success) return params; // no files selected

    // const selection = data.files.selection;
    const userId = data.data.userId;
    const fileUrl = data.data.fileUrl;
    const pdfChatId = data.data.pdfChatId;

    console.log({ userId, fileUrl, pdfChatId });

    const recentMessage = messages.pop();

    if (!recentMessage || recentMessage.role !== "user") {
      if (recentMessage) {
        messages.push(recentMessage);
      }

      return params;
    }

    const lastUserMessageContent = recentMessage.content
      .filter((content) => content.type === "text")
      .map((content) => content.text)
      .join("\n");

    // Classify the user prompt as whether it requires more context or not
    const { object: classification } = await generateObject({
      // fast model for classification:
      model: deepseek("deepseek-chat"),
      //   model: openai("gpt-4o-mini", { structuredOutputs: true }),
      output: "enum",
      enum: ["question", "statement", "other"],
      //   system: "Classify the user message as a question, statement, or other.",
      system: `Classify the user message into one of three categories:
- Question: The user is asking something.
- Statement: The user is providing information.
- Other: The message does not fit into the above two categories.
Provide the classification in lowercase.
`,
      prompt: lastUserMessageContent,
    });

    console.log({ classification });

    // only use RAG for questions
    if (classification !== "question") {
      messages.push(recentMessage);
      return params;
    }

    // Use hypothetical document embeddings:
    const { text: hypotheticalAnswer } = await generateText({
      // fast model for generating hypothetical answer:
      model: deepseek("deepseek-chat"),
      //   model: openai("gpt-4o-mini", { structuredOutputs: true }),
      system:
        "You are assisting a user by answering their question based on hypothetical document embeddings. Provide a concise answer (within 200 tokens) that is informative and directly relevant to the question:",
      //   system: "Answer the user's question concisely, within 200 tokens:",
      prompt: lastUserMessageContent,
      maxTokens: 200,
    });

    console.log({ hypotheticalAnswer });
    console.log({ lastUserMessageContent });

    // Embed the hypothetical answer
    const { embedding: hypotheticalAnswerEmbedding } = await embed({
      model: openai.embedding("text-embedding-ada-002"),
      // model: openai.embedding("text-embedding-3-small"),
      // value: lastUserMessageContent,
      value: hypotheticalAnswer,
    });

    const supabase = await createClient();

    const { error: matchError, data: matchChunks } = await supabase.rpc(
      "match_document_content",
      {
        pdf_chat_id: pdfChatId,
        embedding: hypotheticalAnswerEmbedding,
        match_threshold: 0.5,
        // match_threshold: 0.78,
        match_count: 3,
        // min_content_length: 50,
      }
    );

    console.log({ matchError });
    console.log({ matchChunks });

    console.log({ topKChunks: matchChunks.length });

    // add the chunks to the last user message
    messages.push({
      role: "user",
      content: [
        ...recentMessage.content,
        {
          type: "text",
          text: "Here is some relevant information that you can use to answer the question:",
        },
        ...matchChunks.map((chunk: any) => ({
          type: "text" as const,
          text: chunk.content,
        })),
      ],
    });

    return { ...params, prompt: messages };
  },
};

export const customModel = wrapLanguageModel({
  //   model: openai("gpt-4o"),
  model: deepseek("deepseek-chat"),
  middleware: ragMiddleware,
});
