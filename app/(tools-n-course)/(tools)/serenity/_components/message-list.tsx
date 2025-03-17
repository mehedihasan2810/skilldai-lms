"use client";

import { Separator } from "@/components/ui/separator";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { useSpeechSynthesis } from "@/lib/hooks/use-speech-synthesis";
import { Message } from "ai";
import {
  Check,
  CircleStop,
  Copy,
  Loader,
  Mic,
  Speaker,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import React, { Fragment, RefObject, useState } from "react";
import { ChatMessage } from "./message";
import { MessageLoading } from "@/components/message-loading";
import { cn } from "@/lib/utils";
type Props = {
  messages: Message[];
  containerRef: RefObject<HTMLDivElement | null>;
  isLoading: boolean;
};

export const ChatMessageList = React.memo(
  ({ messages, containerRef, isLoading }: Props) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard({
      timeout: 2000,
    });
    const { speak, stop, isSpeaking, voices } = useSpeechSynthesis();
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const [speakId, setSpeakId] = useState<string | null>(null);

    const isChatLoading =
      (messages[messages.length - 1]?.role === "user" ||
        (messages[messages.length - 1]?.role === "assistant" &&
          messages[messages.length - 1]?.content === "")) &&
      isLoading;

    function onCopy(content: string, messageId: string) {
      // if (isCopied) return;
      copyToClipboard(content);

      setCopiedMessageId(messageId);
      copyToClipboard(content);

      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    }

    // function speak(content: string) {
    //   let utterance = new SpeechSynthesisUtterance(content);
    //   let voicesArray = speechSynthesis.getVoices();
    //   utterance.voice = voicesArray[2];
    //   speechSynthesis.speak(utterance);
    // }

    console.log({ isSpeaking, voices });

    return (
      <div ref={containerRef} className="flex-1 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Image
                src="/serenity.png"
                alt="Ai assistant logo"
                className="max-w-[300px] object-contain shrink-0"
                width={300}
                height={300}
              />
              <p className="text-lg font-medium mt-4 text-center">
                Hi I am Anita your AI therapist <br /> and I am listening
              </p>
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <Fragment key={message.id}>
            <ChatMessage
              role={message.role}
              text={message.content}
              attachments={message.experimental_attachments || []}
            />
            {message.role === "assistant" && !isLoading && (
              <div
                className={cn(
                  "flex items-center  gap-1 text-muted-foreground -translate-y-2 pl-8",
                  index === messages.length - 1 && "pb-4"
                )}
              >
                <button
                  title="Read aloud"
                  className="p-1.5 rounded-md hover:bg-muted"
                  onClick={() => {
                    if (isSpeaking && message.id === speakId) {
                      setSpeakId(null);
                      stop();
                      return;
                    }
                    setSpeakId(message.id);
                    speak(message.content);
                  }}
                >
                  {isSpeaking && message.id === speakId ? (
                    <CircleStop className="size-5" />
                  ) : (
                    <Volume2 className="size-5" />
                  )}
                </button>
                <button
                  title="Copy"
                  className="p-1.5 rounded-md hover:bg-muted"
                  onClick={() => onCopy(message.content, message.id)}
                >
                  {copiedMessageId === message.id ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </Fragment>
        ))}
        {isChatLoading && (
          <>
            <div className={`flex items-center gap-3`}>
              <div className={`border rounded-md p-1 shrink-0`}>
                {" "}
                <Image
                  src="/skilld-logo.png"
                  alt="Ai assistant logo"
                  className="size-5 object-contain shrink-0"
                  width={20}
                  height={20}
                />{" "}
              </div>{" "}
              <MessageLoading />
            </div>
          </>
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.messages === nextProps.messages &&
    prevProps.containerRef === nextProps.containerRef &&
    prevProps.isLoading === nextProps.isLoading
);

ChatMessageList.displayName = "ChatMessageList";
