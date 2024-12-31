"use client";

import { ChatMessage } from "@/components/chat/message";
import { Separator } from "@/components/ui/separator";
import { Message } from "ai";
import { Loader } from "lucide-react";
import Image from "next/image";
import React, { Fragment, RefObject } from "react";

type Props = {
  messages: Message[];
  containerRef: RefObject<HTMLDivElement>;
  isLoading: boolean;
};

export const ChatMessageList = React.memo(
  ({ messages, containerRef, isLoading }: Props) => {
    const isChatLoading =
      (messages[messages.length - 1]?.role === "user" ||
        (messages[messages.length - 1]?.role === "assistant" &&
          messages[messages.length - 1]?.content === "")) &&
      isLoading;

    return (
      <div
        ref={containerRef}
        className="flex-1 flex flex-col gap-4 max-w-3xl mx-auto w-full pt-20 sm:pt-4 pb-10 px-2 sm:px-0"
      >
        {messages.map((message, index) => (
          <Fragment key={message.id}>
            <ChatMessage
              role={message.role}
              text={message.content}
              attachments={message.experimental_attachments || []}
            />

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
