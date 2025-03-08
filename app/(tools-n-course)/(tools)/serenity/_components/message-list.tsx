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

type Props = {
  messages: Message[];
  containerRef: RefObject<HTMLDivElement>;
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
      <div
        ref={containerRef}
        className="flex-1 flex flex-col gap-4 max-w-3xl mx-auto w-full pt-20 sm:pt-4 pb-10 px-2 sm:px-0 "
      >
        {messages.map((message, index) => (
          <Fragment key={message.id}>
            <ChatMessage
              role={message.role}
              text={message.content}
              attachments={message.experimental_attachments || []}
            />
            {message.role === "assistant" && !isLoading && (
              <div className="flex items-center  gap-1 text-muted-foreground -translate-y-2 pl-10">
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

            {index !== messages.length - 1 && <Separator />}
          </Fragment>
        ))}
        {isChatLoading && (
          <>
            <Separator />
            <div className={`flex items-start gap-3 px-2 py-2 rounded-md`}>
              <div className={`border rounded-md p-1 shrink-0 mt-1.5`}>
                {" "}
                <Image
                  src="/skilld-logo.png"
                  alt="Ai assistant logo"
                  className="size-5 object-contain shrink-0"
                  width={20}
                  height={20}
                />{" "}
              </div>{" "}
              <Loader className="size-6 animate-spin mt-2.5" />
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
