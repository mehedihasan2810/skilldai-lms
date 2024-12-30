"use client";

import { Models } from "@/app/types";
import { ChatMessage } from "@/components/chat/message";
import { Separator } from "@/components/ui/separator";
import { ArtifactMessagePartData } from "@/lib/utils";
import { Message } from "ai";
import { Fragment, memo, RefObject } from "react";

type Props = {
  messages: Message[];
  setCurrentArtifact: (data: ArtifactMessagePartData) => void;
  containerRef: RefObject<HTMLDivElement>;
};

export const ChatMessageList = memo(function ChatMessageList({
  messages,
  setCurrentArtifact,
  containerRef,
}: Props) {
  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col gap-4 max-w-3xl mx-auto w-full pt-20 sm:pt-4 pb-10 px-2 sm:px-0"
    >
      {/* <MathJaxContext> */}
        {messages.map((message, index) => (
          <Fragment key={message.id}>
            <ChatMessage
              role={message.role}
              model={Models.claude}
              text={message.content}
              attachments={message.experimental_attachments || []}
              setCurrentArtifact={setCurrentArtifact}
            />

            {index !== messages.length - 1 && <Separator />}
          </Fragment>
        ))}
      {/* </MathJaxContext> */}
    </div>
  );
});
