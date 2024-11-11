import { systemPrompt } from "@/app/api/chat/systemPrompt";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToCoreMessages, Message, ImagePart } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { Models } from "@/app/types";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const maxDuration = 60;

// const anthropic = createAnthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

const deepseek = createOpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-c629e797f1e848c5bfa7ff555bab2cea",
});
// const groq = createOpenAI({
//   baseURL: "https://api.groq.com/openai/v1",
//   apiKey: process.env.GROQ_API_KEY,
// });

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const MAX_TOKENS = process.env.NEXT_PUBLIC_MAX_TOKENS;
  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();

  const { messages, user_email } = await req.json();

  console.log({ user_email });

  const { data: tokenUsage, error } = await supabase
    .from("token_usage")
    .select("total_tokens")
    .eq("user_email", user_email)
    .eq("month", CURRENT_MONTH)
    .eq("year", CURRENT_YEAR)
    .single();

  console.log({ tokenUsage, error });

  console.log({ MAX_TOKENS });

  if ((tokenUsage?.total_tokens || 0) >= (Number(MAX_TOKENS) || 0)) {
    return new Response("Monthly token limit reached", { status: 429 });
  }

  const result = await streamText({
    model: anthropic(process.env.LLM_MODEL_NAME!),
    // model: anthropic("claude-3-5-sonnet-20240620"),
    // model: groq("llama-3.1-70b-versatile"),
    // model: deepseek("deepseek-chat"),

    system: systemPrompt,

    // maxTokens: 50,
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
    onFinish: async ({ finishReason, usage,  }) => {
      console.log({ finishReason, usage });
      const { data, error: updateError } = await supabase
        .from("token_usage")
        .upsert(
          {
            user_email: user_email,
            month: CURRENT_MONTH,
            year: CURRENT_YEAR,
            total_tokens: (tokenUsage?.total_tokens || 0) + usage.totalTokens,
          },
          {
            onConflict: "user_email",
          }
        )
        .select("total_tokens");
      console.log({ data, updateError });
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
