"use client";

import { Props as ChatInputProps } from "@/components/chat/input";
import { Message, useChat } from "ai/react";
import { addMessage, createChat, getChat, getChatMessages } from "@/lib/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useSupabase } from "@/lib/supabase";
import { Attachment } from "@/app/types";
import { ArtifactMessagePartData, cn, convertFileToBase64 } from "@/lib/utils";
// import { useRouter } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useWhisper as useRealWhisper } from "@chengsokdara/use-whisper";
import { Props as ReactArtifactProps } from "@/components/artifact/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { toast } from "sonner";
import { reportErrorAction } from "@/actions/report-error-via-mail";
import { ChatInput } from "./chat-input";
import { ChatMessageList } from "./message-list";
import { Plus } from "lucide-react";
import {
  Button,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
  Tooltip,
} from "@/components/ui";

type Props = {
  id: string | null;
  userEmail: string;
  userId: string;
};

export const ChatPanel = ({ id, userEmail, userId }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // State management
  const [chatId, setChatId] = useState(id);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [currentArtifact, setCurrentArtifact] =
    useState<ArtifactMessagePartData | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);

  const [activeChatTab, setActiveChatTab] = useState("studyBuddyGPT");
  const [isChatCreating, setIsChatCreating] = useState(false);

  const {
    data: chat,
    error,
    isLoading: isChatLoading,
  } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => await getChat({ chatId }),
    enabled: !!chatId,
  });

  console.log({ chat });

  // Create new chat mutation
  const createChatMutation = useMutation({
    mutationFn: async ({
      title,
      type,
      userId,
    }: {
      title: string;
      firstMessage: Message;
      secondMessage: Message;
      type: string;
      userId: string;
    }) => await createChat({ title, userId, type }),
    onSuccess: async (newChat, { firstMessage, secondMessage }) => {
      // queryClient.setQueryData<Chat[]>(["chats"], (oldChats) => {
      //   return [...(oldChats || []), newChat];
      // });

      setIsChatCreating(true);

      setChatId(newChat.id);

      console.log({ firstMessage, secondMessage });

      await addMessage(
        // supabase,
        newChat.id,
        firstMessage,
        firstMessage.experimental_attachments
      );
      await addMessage(newChat.id, secondMessage);

      await queryClient.invalidateQueries({ queryKey: ["chats"] });

      setIsChatCreating(false);

      router.push(`/chat/${newChat.id}`);
    },
  });

  // Chat hook setup
  const {
    messages,
    setMessages,
    input,
    setInput,
    append,
    stop: stopGenerating,
    isLoading: generatingResponse,
    handleSubmit,
  } = useChat({
    api: "/api/chat/serenity",
    initialMessages,
    onFinish: async (message) => {
      console.log({ chatId, message });
      // if (chatId) {
      //   await addMessage(chatId, message);
      // }
    },
    onError(error) {
      console.log({ chatError: error.message });

      toast.error(error.message, {
        position: "top-center",
      });
      reportErrorAction({
        userEmail,
        errorMessage: error.message,
        errorTrace: `[ChatPanel] [useChat] [onError] [app/components/chat/panel.tsx]`,
        errorSourceUrl: "/chat",
      });
    },
    sendExtraMessageFields: true,
    // body: { user_email: session?.user.email || "userrrr" },
  });

  // Scroll as new messages are added
  const { messagesRef, scrollRef, showScrollButton, handleManualScroll } =
    useScrollAnchor(messages);

  // Whisper hook setup for voice input
  const useWhispherHook = useRealWhisper;
  // const useWhispherHook = "getSettings().openaiApiKey"
  //   ? useRealWhisper
  //   : useFakeWhisper;
  const { recording, transcribing, transcript, startRecording, stopRecording } =
    useWhispherHook({
      apiKey: "getSettings().openaiApiKey",
    });

  // Update input with transcribed text
  useEffect(() => {
    if (!recording && !transcribing && transcript?.text) {
      setInput((prev) => prev + ` ${transcript.text}`);
    }
  }, [recording, transcribing, transcript?.text, setInput]);

  // Handle attachment management
  const handleAddAttachment: ChatInputProps["onAddAttachment"] = (
    newAttachments
  ) => {
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleAddFiles = (newFiles: FileList) => {
    setFiles(newFiles);
    // setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveAttachment: ChatInputProps["onRemoveAttachment"] = (
    attachment
  ) => {
    setFiles(null);
    setAttachments((prev) =>
      prev.filter((item) => item.url !== attachment.url)
    );
  };

  // Handle sending messages
  const handleSend = async (event?: SyntheticEvent) => {
    const query = input.trim();

    if (!query) return;

    const options = files ? { experimental_attachments: files } : {};
    console.log({ files });
    handleSubmit(event, {
      body: {
        userId,
        user_email: userEmail,
        activeChatTab: chat?.type ?? activeChatTab,
      },
      ...options,
    });

    setInput("");
    stopRecording();

    const userAttachment = files
      ? [
          {
            contentType: files[0].type,
            name: files[0].name,
            url: await convertFileToBase64(files[0]),
          },
        ]
      : [];

    if (chatId) {
      await addMessage(
        // supabase,
        chatId,
        { role: "user", content: query },
        userAttachment
      );
    }

    setAttachments([]);
    setSelectedArtifacts([]);
    setFiles(null);
  };

  console.log({ messages });

  return (
    <>
      <div
        className={cn(
          "relative w-full flex-1 overflow-x-hidden overflow-y-auto h-[calc(100dvh-64px)] pt-4"
        )}
        ref={scrollRef}
      >
        <div className="relative mx-auto flex flex-col max-w-3xl flex-1 px-4 md:px-0 h-full">
          <ChatMessageList
            messages={messages}
            containerRef={messagesRef}
            isLoading={generatingResponse}
          />
          <ChatInput
            chatId={chatId ?? ""}
            input={input}
            setInput={setInput}
            isLoading={generatingResponse}
            stop={stopGenerating}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={append}
            handleSubmit={handleSubmit}
          />
        </div>
        {messages.length !== 0 && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 left-4 w-8 h-8 px-1.5"
                  onClick={() => {
                    setMessages([]);
                    setInput("");
                    window.history.replaceState({}, "", "/serenity");
                  }}
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>New chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </>
  );
};

const dummyMessages = [
  {
    id: "qvFrhnHoyV7J2clI",
    createdAt: "2025-03-08T14:11:34.688Z",
    role: "user",
    content: "hello tell me how you can help me",
    parts: [
      {
        type: "text",
        text: "hello tell me how you can help me",
      },
    ],
  },
  {
    id: "msg-tRzRbfaMlIwiM5OmNueTNMz9",
    createdAt: "2025-03-08T14:11:38.441Z",
    role: "assistant",
    content:
      "Hi there! I'm Anita, and I'm here to listen and chat with you about whatever's on your mind. Think of me as a friendly ear and a supportive guide.\n\nI can help you explore your thoughts and feelings, understand patterns in your behavior, and work towards positive changes in your life. I often use ideas from different therapy approaches like Cognitive Behavioral Therapy, Solution-Focused Therapy, Person-Centered Therapy, and Gestalt Therapy.\n\nWhat's been on your mind lately?\n",
    parts: [
      {
        type: "text",
        text: "Hi there! I'm Anita, and I'm here to listen and chat with you about whatever's on your mind. Think of me as a friendly ear and a supportive guide.\n\nI can help you explore your thoughts and feelings, understand patterns in your behavior, and work towards positive changes in your life. I often use ideas from different therapy approaches like Cognitive Behavioral Therapy, Solution-Focused Therapy, Person-Centered Therapy, and Gestalt Therapy.\n\nWhat's been on your mind lately?\n",
      },
    ],
    revisionId: "pmZTJaiX3Wrqcyl2",
  },
  {
    id: "G6HrI3k96aznFHrc",
    createdAt: "2025-03-08T14:11:48.167Z",
    role: "user",
    content: "who are you?",
    parts: [
      {
        type: "text",
        text: "who are you?",
      },
    ],
  },
  {
    id: "msg-qRzeN9gNefqUkC81JSpJhlga",
    createdAt: "2025-03-08T14:11:50.451Z",
    role: "assistant",
    content:
      "I'm Anita, a therapist here to listen and support you. I'm trained in various therapeutic techniques, and I'm here to provide a safe space for you to explore your thoughts and feelings.\n\nWhat's something you'd like to talk about today?\n",
    parts: [
      {
        type: "text",
        text: "I'm Anita, a therapist here to listen and support you. I'm trained in various therapeutic techniques, and I'm here to provide a safe space for you to explore your thoughts and feelings.\n\nWhat's something you'd like to talk about today?\n",
      },
    ],
    revisionId: "dY8BLiHrCdcm1ngd",
  },
];
