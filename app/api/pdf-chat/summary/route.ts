import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openrouter } from "@openrouter/ai-sdk-provider";
import {
  streamText,
  convertToCoreMessages,
  Message,
  ToolInvocation,
  Attachment,
} from "ai";

export const maxDuration = 60;

type UIMessage = {
  role: "system" | "user" | "assistant" | "data";
  content: string;
  toolInvocations?: ToolInvocation[];
  experimental_attachments?: Attachment[];
};

export async function POST(req: Request) {
  const {
    messages,
    user_email,
    userId,
  }: { messages: Message[]; user_email: string; userId: string } =
    await req.json();

  console.log({ user_email, userId });

  // console.log(messages);
  // console.log(messages[0].experimental_attachments);

  const messages2 = messages.map((message: Message, i: number) => {
    if (
      i === messages.length - 1 &&
      message.role === "user" &&
      message.experimental_attachments &&
      (message.experimental_attachments ?? []).length > 0
    ) {
      const attachment = message.experimental_attachments[0];
      return {
        role: "user",
        content: [
          {
            type: "text",
            text: message.content,
          },
          {
            type: "file",
            data: attachment.url,
            mimeType: "application/pdf",
          },
        ],
      };
    }

    return {
      role: message.role,
      content: message.content,
    };
  });

  console.dir(messages2, { depth: null });

  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20241022"),
    // model: openrouter("anthropic/claude-3.5-sonnet:beta"),
    // model: google("gemini-1.5-pro-latest"),
    system: "You are a helpful assistant for PDF content.",
    messages: messages2 as UIMessage[],
    // messages: convertToCoreMessages(messages),
    frequencyPenalty: 0,
    presencePenalty: 0,
    temperature: 0.2,
    onFinish: async ({ finishReason, usage }) => {
      console.log({ finishReason, usage });
    },
  });

  return result.toDataStreamResponse();
}
