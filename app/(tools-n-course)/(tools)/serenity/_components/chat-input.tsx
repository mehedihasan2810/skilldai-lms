import { cn } from "@/lib/utils";
import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import { SendIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

export const ChatInput = ({
  chatId,
  input,
  setInput,
  isLoading,
  stop,
  attachments,
  setAttachments,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
}: {
  chatId: string;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  className?: string;
}) => {
  const pathname = usePathname();
  console.log({ pathname });
  const [isFocused, setIsFocused] = useState(false);
  const submitForm = useCallback(() => {
    window.history.replaceState({}, "", `/serenity/${chatId}`);

    handleSubmit(undefined, {
      experimental_attachments: attachments,
    });

    setAttachments([]);
  }, [attachments, handleSubmit, setAttachments, chatId]);
  return (
    <div
      className={cn(
        "sticky bottom-4 left-0 right-0 w-full rounded-[2rem] bg-secondary text-sm outline-none shadow flex items-center gap-1 pr-2 mb-4 overflow-hidden transition-all shrink-0",
        isFocused && "border border-ring outline-none ring-[4px] ring-ring/20",
        className
      )}
    >
      <TextareaAutosize
        className="w-full px-4 py-4 outline-none resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();

            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else {
              submitForm();
            }
          }
        }}
        autoFocus
        maxRows={5}
        placeholder={
          pathname !== "/serenity"
            ? "Type a message..."
            : "How do you feel today?"
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button className="rounded-full size-10 flex items-center justify-center bg-muted text-muted-foreground p-2">
        <SendIcon />
      </button>
    </div>
  );
};
