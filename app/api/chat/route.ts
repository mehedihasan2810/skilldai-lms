import { systemPrompt } from "@/app/api/chat/systemPrompt";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToCoreMessages, Message, ImagePart } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { Models } from "@/app/types";

export const maxDuration = 60;

// const anthropic = createAnthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages, user_email } = await req.json();

  console.log({ user_email, messages });

  const result = await streamText({
    // model: anthropic("claude-3-5-sonnet-20240620"),
    model: groq("llama-3.1-70b-versatile"),
    // model: groq("llama3-70b-8192"),

    system: systemPrompt,

    messages: convertToCoreMessages(messages),
    // ...options,
    experimental_telemetry: {
      isEnabled: true,
      functionId: "skilldai-function", // Trace name
      metadata: {
        // langfuseTraceId: "trace-123", // Langfuse trace
        tags: [user_email], // Custom tags
        userId: user_email, // Langfuse user
        sessionId: "skilldai-session", // Langfuse session
        user: user_email, // Any custom attribute recorded in metadata
      },
    },
  });

  // return result.toAIStreamResponse();
  return result.toDataStreamResponse();
}

// import { systemPrompt } from "@/app/api/chat/systemPrompt";
// import { createAnthropic } from "@ai-sdk/anthropic";
// import { streamText, convertToCoreMessages, Message, ImagePart } from "ai";
// import { createOpenAI } from "@ai-sdk/openai";
// import { Models } from "@/app/types";

// export const maxDuration = 60;

// export async function POST(req: Request) {
//   const { messages, apiKey, model } = await req.json();

//   let llm;
//   let options: Record<string, any> = {};

//   if (model === Models.claude) {
//     const anthropic = createAnthropic({
//       apiKey,
//     });

//     llm = anthropic("claude-3-5-sonnet-20240620");

//     options = {
//       ...options,
//       maxTokens: 8192,
//       headers: {
//         ...(options.headers || {}),
//         "anthropic-beta": "max-tokens-3-5-sonnet-2024-07-15",
//       },
//     };
//   } else if (model.startsWith("gpt")) {
//     const openai = createOpenAI({
//       compatibility: "strict", // strict mode, enable when using the OpenAI API
//       apiKey,
//     });

//     llm = openai(model);
//   }

//   if (!llm) throw new Error(`Unsupported model: ${model}`);

//   const initialMessages = messages.slice(0, -1);
//   const currentMessage: Message = messages[messages.length - 1];
//   const attachments = currentMessage.experimental_attachments || [];
//   const imageParts: ImagePart[] = attachments.map((file) => ({
//     type: "image",
//     image: new URL(file.url),
//   }));

//   const result = await streamText({
//     model: llm,
//     messages: [
//       ...convertToCoreMessages(initialMessages),
//       {
//         role: "user",
//         content: [
//           {
//             type: "text",
//             text: currentMessage.content,
//           },
//           ...imageParts,
//         ],
//       },
//     ],
//     system: systemPrompt,
//     ...options,
//   });

//   return result.toAIStreamResponse();
// }
