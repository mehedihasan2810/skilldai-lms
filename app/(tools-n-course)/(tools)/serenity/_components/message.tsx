"use client";

import { Attachment, ChatMessageRoles, Models } from "@/app/types";
import Markdown from "@/components/markdown/markdown";
import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const getTextFromDataUrl = (dataUrl: string) => {
  const base64 = dataUrl.split(",")[1];
  return window.atob(base64);
};

type Props = {
  role: ChatMessageRoles;
  text: string;
  attachments: Attachment[];
};

export const ChatMessage = React.memo(
  ({ role, text, attachments }: Props) => {
    return (
      <div
        className={cn(
          `flex items-start gap-2 rounded-md`,
          role === "user"
            ? "max-w-[80%] w-fit self-end bg-secondary p-4 py-2 rounded-3xl"
            : ""
        )}
      >
        {/* <div className={`border rounded-md p-1 shrink-0 mt-1.5`}>
          {role === "user" ? (
            <UserIcon size={20} />
          ) : (
            <Image
              src="/skilld-logo.png"
              alt="Ai assistant logo"
              className="size-5 object-contain shrink-0"
              width={20}
              height={20}
            />
          )}
        </div> */}

        {role === "assistant" && (
          <div className={`border rounded-md p-1 shrink-0`}>
            <Image
              src="/skilld-logo.png"
              alt="Ai assistant logo"
              className="size-5 object-contain shrink-0"
              width={20}
              height={20}
            />
          </div>
        )}

        {role === "user" && (
          <div className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-2xl break-words whitespace-pre-wrap">
            {text}
          </div>
        )}

        {role === "assistant" && (
          <Markdown text={text} className="max-w-2xl " />
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.text === nextProps.text &&
    prevProps.role === nextProps.role &&
    prevProps.attachments === nextProps.attachments
);

ChatMessage.displayName = "ChatMessage";
