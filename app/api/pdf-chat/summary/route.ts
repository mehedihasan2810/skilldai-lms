import { google } from "@ai-sdk/google";
import { streamText, convertToCoreMessages } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, user_email, userId } = await req.json();

  console.log({ user_email, userId });

  console.log(messages);

  const result = streamText({
    model: google("gemini-1.5-pro-latest"),
    system: "You are a helpful assistant for PDF content.",
    messages: convertToCoreMessages(messages),
    frequencyPenalty: 0,
    presencePenalty: 0,
    temperature: 0.2,
    onFinish: async ({ finishReason, usage }) => {
      console.log({ finishReason, usage });
    },
  });

  return result.toDataStreamResponse();
}
