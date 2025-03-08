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
      if (chatId) {
        await addMessage(chatId, message);
      }
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
          "max-w-3xl mx-auto relative flex flex-col w-full flex-1 overflow-x-hidden overflow-y-auto h-[calc(100dvh-64px)] border border-red-500"
        )}
        ref={scrollRef}
      >
        {/* <div className=" mx-auto flex h-full w-full max-w-3xl flex-1 flex-col md:px-2 border border-blue-500"> */}
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
        {/* </div> */}
      </div>
    </>
  );
};
