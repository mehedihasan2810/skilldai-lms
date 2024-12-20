import {
  codeGPTSystemPrompt,
  studyBuddySystemPrompt,
} from "@/app/api/chat/systemPrompt";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToCoreMessages, Message, ImagePart } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";

export const maxDuration = 60;

// const anthropic = createAnthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

const deepseek = createOpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// const groq = createOpenAI({
//   baseURL: "https://api.groq.com/openai/v1",
//   apiKey: process.env.GROQ_API_KEY,
// });

export async function POST(req: Request) {
  const supabase = await createClient();

  const MAX_TOKENS = process.env.NEXT_PUBLIC_MAX_TOKENS;
  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();

  const { messages, user_email, userId, activeChatTab } = await req.json();

  console.log({ user_email, userId, activeChatTab });

  const { data: tokenUsage, error } = await supabase
    .from("token_usage")
    .select("total_tokens,input_token,output_token")
    .eq("user_email", user_email)
    .eq("month", CURRENT_MONTH)
    .eq("year", CURRENT_YEAR)
    .single();

  console.log({ tokenUsage, error });

  console.log({ MAX_TOKENS });

  if ((tokenUsage?.total_tokens || 0) >= (Number(MAX_TOKENS) || 0)) {
    return new Response("Monthly token limit reached", { status: 429 });
  }

  const result = streamText({
    // model: anthropic(process.env.LLM_MODEL_NAME!),
    // model: anthropic("claude-3-haiku-20240307"),
    // model: anthropic("claude-3-5-sonnet-20240620"),
    // model: groq("llama-3.1-70b-versatile"),
    model:
      activeChatTab === "codeGPT"
        ? anthropic("claude-3-5-sonnet-20240620")
        : deepseek("deepseek-chat"),

    system:
      activeChatTab === "codeGPT"
        ? codeGPTSystemPrompt
        : studyBuddySystemPrompt,

    // maxTokens: 50,
    messages: convertToCoreMessages(messages),
    // ...options,
    experimental_telemetry: {
      isEnabled: true,
      functionId:
        activeChatTab === "codeGPT"
          ? "CodeGPT-function"
          : "StudyBuddyGPT-function",
      metadata: {
        // langfuseTraceId: "trace-123", // Langfuse trace
        tags: [
          activeChatTab === "codeGPT" ? "CodeGPT" : "StudyBuddyGPT",
          user_email,
        ],
        userId: user_email,
        sessionId:
          activeChatTab === "codeGPT"
            ? "CodeGPT-session"
            : "StudyBuddyGPT-session",
        user: user_email,
      },
    },
    frequencyPenalty: 0,
    presencePenalty: 0,
    temperature: 0.2,
    onFinish: async ({ finishReason, usage }) => {
      console.log({ finishReason, usage });
      const { data, error: updateError } = await supabase
        .from("token_usage")
        .upsert(
          {
            type: `chat:${
              activeChatTab === "codeGPT" ? "codeGPT" : "studyBuddyGPT"
            }`,
            user_id: userId,
            user_email: user_email,
            email: user_email,
            month: CURRENT_MONTH,
            year: CURRENT_YEAR,
            input_token: (tokenUsage?.input_token || 0) + usage.promptTokens,
            output_token:
              (tokenUsage?.output_token || 0) + usage.completionTokens,
            total_tokens: (tokenUsage?.total_tokens || 0) + usage.totalTokens,
            llm: activeChatTab === "codeGPT" ? "anthropic" : "deepseek",
            model:
              activeChatTab === "codeGPT"
                ? "claude-3-5-sonnet-20240620"
                : "deepseek-chat",
          },
          {
            onConflict: "user_email",
          }
        )
        .select("total_tokens");
      console.log({ data, updateError });
    },
  });

  return result.toDataStreamResponse();
}
