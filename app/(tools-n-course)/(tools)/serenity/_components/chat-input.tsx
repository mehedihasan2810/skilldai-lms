import { Button } from "@/components/ui/button";
import { useVoiceToText } from "@/hooks/use-voice-to-text";
import { cn } from "@/lib/utils";
import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import { SendIcon, Mic, MicOff } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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

  const {
    startListening,
    stopListening,
    transcript,
    setTranscript,
    reset,
    isListening,
  } = useVoiceToText();

  const submitForm = useCallback(() => {
    window.history.replaceState({}, "", `/serenity/${chatId}`);

    handleSubmit(undefined, {
      experimental_attachments: attachments,
    });

    setAttachments([]);
  }, [attachments, handleSubmit, setAttachments, chatId]);

  useEffect(() => {
    if (transcript && isListening) {
      setInput(transcript.trim());
    }
  }, [isListening, setInput, transcript]);

  return (
    <div
      className={cn(
        "sticky bottom-4 left-0 right-0 w-full rounded-[2rem] bg-background dark:bg-secondary text-sm outline-none shadow flex items-center gap-1 pr-2 mb-4 overflow-hidden transition-all shrink-0",
        isFocused && "border border-ring outline-none ring-[4px] ring-ring/20",
        className
      )}
    >
      <TextareaAutosize
        className="w-full px-6 py-4 outline-none resize-none bg-background dark:bg-secondary"
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
      <button
        onClick={
          isListening
            ? () => {
                stopListening();
                setInput("");
              }
            : startListening
        }
        type="button"
        className={cn(
          "size-9 p-2 flex items-center justify-center relative rounded-full bg-muted text-muted-foreground",
          isListening
            ? "text-red-500 after:absolute after:right-0 after:top-0 after:size-3 after:animate-ping after:rounded-full after:bg-red-500 after:duration-1000 hover:text-red-500/80"
            : ""
        )}
      >
        {isListening ? (
          <MicOff className="" />
        ) : (
          <Mic className="" />
        )}
      </button>
      <button
        onClick={submitForm}
        className="rounded-full size-9 flex items-center justify-center bg-primary/15 text-primary p-2"
      >
        <SendIcon />
      </button>
    </div>
  );
};
