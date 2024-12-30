"use client";

import { Attachment, ChatMessageRoles, Models } from "@/app/types";
import Markdown from "@/components/markdown/markdown";
import { ArtifactMessagePartData } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

const getDisplayNameFromRole = (
  role: ChatMessageRoles,
  model: Models | null
) => {
  if (role === "user") return "Me";

  switch (model) {
    case Models.claude:
      return "Claude";

    case Models.gpt4o:
      return "GPT 4o";

    default:
      return model;
  }
};

const getTextFromDataUrl = (dataUrl: string) => {
  const base64 = dataUrl.split(",")[1];
  return window.atob(base64);
};

type Props = {
  role: ChatMessageRoles;
  model: Models | null;
  text: string;
  setCurrentArtifact: (data: ArtifactMessagePartData) => void;
  attachments: Attachment[];
};

export const ChatMessage = memo(function ChatMessage({
  role,
  text,
  attachments,
}: Props) {
  return (
    <div className={`flex items-start gap-2 px-2 py-2 rounded-md`}>
      <div className={`border rounded-md p-1 shrink-0 mt-1.5`}>
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
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          {attachments.map((attachment) =>
            attachment.contentType?.startsWith("image") ? (
              <img
                className="rounded-md w-40 mb-3"
                key={attachment.name}
                src={attachment.url}
                alt={attachment.name}
              />
            ) : attachment.contentType?.startsWith("text") ? (
              <div
                key={attachment.name}
                className="text-xs w-40 h-24 overflow-hidden text-zinc-400 border p-2 rounded-md dark:bg-zinc-800 dark:border-zinc-700 mb-3"
              >
                {getTextFromDataUrl(attachment.url)}
              </div>
            ) : null
          )}
        </div>
        {/* {attachments.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {attachments.map((attachment, index) => (
              <AttachmentPreviewButton key={index} file={attachment} />
            ))}
          </div>
        )} */}

        {role === "user" && (
          <div className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-2xl break-words break-all whitespace-pre-wrap">
            {text}
          </div>
        )}

        {role === "assistant" && (
          <Markdown text={text} className="max-w-2xl break-all" />
        )}
      </div>
    </div>
  );
});
