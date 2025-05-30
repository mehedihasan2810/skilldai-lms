import { streamText, convertToCoreMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

type MessageRole = "system" | "user" | "assistant" | "data";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { messages, email, userId ,chatId,quizCompleted}: { 
    messages: { role: MessageRole; content: string }[],
    email: string,
    userId: string ,
    chatId:string,
    quizCompleted:boolean,

  } = await req.json();

  console.log({ email, userId });

  const supabase = await createClient();
  function cleanChatLogs(logs: any[]) {
    return logs.map((log) => ({
      role: log.role,
      content: typeof log.content === "string"
        ? log.content.replace(/\\n/g, "\n").replace(/\\"/g, '"').trim()
        : "",
    }));
  }
  function cleanFeedbackLogs(feedback: any[]) {
    return feedback.map((entry) => {
      const fullText = (entry.content || [])
        .map((c: any) => c?.text || "")
        .join("\n")
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .trim();
  
      return {
        role: entry.role,
        content: fullText,
      };
    });
  }
  

  const MAX_TOKENS = process.env.NEXT_PUBLIC_MAX_TOKENS;
  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();

  const { data: tokenUsage, error } = await supabase
    .from("token_usage")
    .select("total_tokens,input_token,output_token")
    .eq("user_id", userId)
    .eq("month", CURRENT_MONTH)
    .eq("year", CURRENT_YEAR)
    .single();

  console.log({ tokenUsage, error });

  if ((tokenUsage?.total_tokens || 0) >= (Number(MAX_TOKENS) || 0)) {
    return new Response("Monthly token limit reached", { status: 429 });
  }

  const lastUserMessage = messages[messages.length - 1].content;
  const isCorrect = lastUserMessage.includes(
    'The correct answer is "' + messages[messages.length - 1].content.split('"')[1] + '"'
  );

  // Initialize OpenRouter client
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = await streamText({
    model: openrouter("google/gemini-2.0-flash-001"),
    system: `You are a helpful AI tutor. When a user submits an answer, respond with:
      - If correct: "You're correct! Would you like me to explain this?"
      - If wrong: "That's incorrect. Would you like me to explain this?"
      Then based on their response ("yes" or "no"), provide an explanation or move`,
    messages: convertToCoreMessages(messages),
    experimental_telemetry: {
      isEnabled: true,
      functionId: "tutor-chat",
      metadata: {
        tags: ["tutor-chat", email],
        userId: email,
        sessionId: "tutor-chat",
        user: email,
      },
    },
    onFinish: async ({ response,finishReason, usage }) => {
      const userMessage = messages[messages.length - 1]?.content;

      if(quizCompleted)
      {
        //store feedback
        const { error: logError } = await supabase.from("feedback_1on1tutor").insert({
          quiz_id: chatId, 
          user_id: userId,
          email:email,
          comments: JSON.stringify(cleanFeedbackLogs(response.messages)),
        });
      
        if (logError) {
          console.error("Error saving chat logs:", logError);
        }
      }
        const { error: logError } = await supabase.from("ai_chat_logs_1on1tutor").upsert(
          {
            quiz_id: chatId,
            user_id: userId,
            email:email,
            chat: JSON.stringify(cleanChatLogs(messages)),
          },
          { onConflict: "quiz_id" }
        );        
      
        if (logError) {
          console.error("Error saving chat logs:", logError);
        }
      console.log({ finishReason, usage });
      const { data, error: updateError } = await supabase
        .from("token_usage")
        .upsert(
          {
            type: `chat:tutor`,
            user_id: userId,
            user_email: email,
            email: email,
            month: CURRENT_MONTH,
            year: CURRENT_YEAR,
            input_token: (tokenUsage?.input_token || 0) + usage.promptTokens,
            output_token: (tokenUsage?.output_token || 0) + usage.completionTokens,
            total_tokens: (tokenUsage?.total_tokens || 0) + usage.totalTokens,
            llm: "google",
            model: "gemini-2.0-flash-001",
          },
          {
            onConflict: "user_email",
          }
        )
        .select("total_tokens");

      if (updateError) {
        console.error('Error updating token usage:', updateError);
      }
    },
  });

  return result.toDataStreamResponse();
}

export const runtime = "edge"; // Optional: Run on edge runtime for faster streaming