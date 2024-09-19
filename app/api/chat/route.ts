import { ArtifactoSystemPrompt } from "@/app/api/chat/systemPrompt";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToCoreMessages, Message, ImagePart } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { Models } from "@/app/types";

export const maxDuration = 60;

// const anthropic = createAnthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log({ messages });

  // let llm;
  let options: Record<string, any> = {};

  // if (model === Models.claude) {
  //   const anthropic = createAnthropic({
  //     apiKey,
  //   });

  //   llm = anthropic("claude-3-5-sonnet-20240620");

  //   options = {
  //     ...options,
  //     // maxTokens: 8192,
  //     headers: {
  //       ...(options.headers || {}),
  //       "anthropic-beta": "max-tokens-3-5-sonnet-2024-07-15",
  //     },
  //   };
  // } else if (model.startsWith("gpt")) {
  //   const openai = createOpenAI({
  //     compatibility: "strict", // strict mode, enable when using the OpenAI API
  //     apiKey,
  //   });

  //   llm = openai(model);
  // }

  // if (!llm) throw new Error(`Unsupported model: ${model}`);

  // const initialMessages = messages.slice(0, -1);
  // console.log({ initialMessages });
  // const currentMessage: Message = messages[messages.length - 1];
  // console.log({ currentMessage });
  // const attachments = currentMessage.experimental_attachments || [];

  // console.log(attachments.length);
  // console.log({ attachments: attachments[0] });
  // const imageParts: any[] = attachments.map((file) => {
  //   if (file.contentType?.includes("text/plain")) {
  //     return { type: "text", text: file.url };
  //   }
  //   return {
  //     type: "image",
  //     image: new URL(file.url),
  //   };
  // });

  // console.log({ imageParts: imageParts[0] });

  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    // model: openai("gpt-4o"),
    // messages: [
    //   ...convertToCoreMessages(initialMessages),
    //   {
    //     role: "user",
    //     content: [
    //       {
    //         type: "text",
    //         text: currentMessage.content,
    //       },
    //       ...imageParts,
    //     ],
    //   },
    // ],
    system: ArtifactoSystemPrompt,
    // system:
    //   "do not respond on markdown or lists, keep your responses brief, you can ask the user to upload images or documents if it could help you understand the problem better",
    messages: convertToCoreMessages(messages),
    // ...options,
  });

  // return result.toAIStreamResponse();
  return result.toDataStreamResponse();
}
