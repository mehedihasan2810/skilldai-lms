"use client";

import { ArtifactPanel } from "@/components/artifact";
import { ChatInput, Props as ChatInputProps } from "@/components/chat/input";
import { ChatMessageList } from "@/components/chat/message-list";
import { Message, useChat } from "ai/react";
import { getSettings } from "@/lib/userSettings";
import { addMessage, createChat, getChatMessages } from "@/lib/db";
import { Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSupabase } from "@/lib/supabase";
import { Chat, Models, Attachment } from "@/app/types";
import { ArtifactMessagePartData, cn, convertFileToBase64 } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useWhisper as useRealWhisper } from "@chengsokdara/use-whisper";
import { Props as ReactArtifactProps } from "@/components/artifact/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { useFakeWhisper } from "@/lib/hooks/use-fake-whisper";
import { createClient } from "@/lib/supabase/client";

type Props = {
  id: string | null;
  userEmail: string;
  userId: string;
};

export const ChatPanel = ({ id, userEmail, userId }: Props) => {
  // Get settings and supabase instance
  // const settings = getSettings();
  // const supabase =  createClient();
  // const { supabase, session } = useSupabase();
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

  // Fetch messages for existing chat
  const fetchMessages = async () => {
    if (chatId) {
      setFetchingMessages(true);
      const messages = await getChatMessages(chatId);
      setInitialMessages(
        messages.map((message) => ({
          id: String(message.id),
          role: message.role as Message["role"],
          content: message.text,
          experimental_attachments: (message.attachments as Attachment[]) || [],
        }))
      );
      setFetchingMessages(false);
    } else {
      setInitialMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Create new chat mutation
  const createChatMutation = useMutation({
    mutationFn: async ({
      title,
    }: {
      title: string;
      firstMessage: Message;
      secondMessage: Message;
    }) => await createChat(title, userId),
    onSuccess: async (newChat, { firstMessage, secondMessage }) => {
      // queryClient.setQueryData<Chat[]>(["chats"], (oldChats) => {
      //   return [...(oldChats || []), newChat];
      // });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      setChatId(newChat.id);

      console.log({ firstMessage, secondMessage });

      await addMessage(
        // supabase,
        newChat.id,
        firstMessage,
        firstMessage.experimental_attachments
      );
      await addMessage(newChat.id, secondMessage);

      router.push(`/chat/${newChat.id}`);
    },
  });

  // Chat hook setup
  const {
    messages,
    input,
    setInput,
    append,
    stop: stopGenerating,
    isLoading: generatingResponse,
    handleSubmit,
  } = useChat({
    initialMessages,
    onFinish: async (message) => {
      console.log({ chatId, message });
      if (chatId) {
        await addMessage( chatId, message);
      }
    },
    onError(error) {
      console.log({ chatError: error.message });

      toast.error(error.message, {
        position: "top-center",
      });
    },
    sendExtraMessageFields: true,
    // body: { user_email: session?.user.email || "userrrr" },
  });

  // Scroll as new messages are added
  const { messagesRef, scrollRef, showScrollButton, handleManualScroll } =
    useScrollAnchor(messages);

  // Create new chat when conditions are met
  useEffect(() => {
    if (!chatId && messages.length === 2 && !generatingResponse) {
      createChatMutation.mutate({
        title: messages[0].content.slice(0, 100),
        firstMessage: messages[0],
        secondMessage: messages[1],
      });
    }
  }, [chatId, messages, generatingResponse]);

  // Whisper hook setup for voice input
  const useWhispherHook = getSettings().openaiApiKey
    ? useRealWhisper
    : useFakeWhisper;
  const { recording, transcribing, transcript, startRecording, stopRecording } =
    useWhispherHook({
      apiKey: getSettings().openaiApiKey,
    });

  // Update input with transcribed text
  useEffect(() => {
    if (!recording && !transcribing && transcript?.text) {
      setInput((prev) => prev + ` ${transcript.text}`);
    }
  }, [recording, transcribing, transcript?.text, setInput]);

  // Handle artifact capture
  const handleCapture: ReactArtifactProps["onCapture"] = ({
    selectionImg,
    artifactImg,
  }) => {
    setAttachments((prev) => [
      ...prev,
      {
        contentType: "image/png",
        url: selectionImg,
      },
    ]);

    setSelectedArtifacts((prev) => {
      if (prev.includes(artifactImg)) return prev;
      return [...prev, artifactImg];
    });
  };

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

    // const settings = getSettings();

    // if (settings.model === Models.claude && !settings.anthropicApiKey) {
    //   toast.error("Please enter your Claude API Key");
    //   return;
    // }

    // if (settings.model.startsWith("gpt") && !settings.openaiApiKey) {
    //   toast.error("Please enter your OpenAI API Key");
    //   return;
    // }

    // const messageAttachments = [
    //   ...attachments
    //     .filter((item) => item.contentType?.startsWith("image"))
    //     .map((item) => ({ url: item.url, contentType: item.contentType })),
    //   ...selectedArtifacts.map((url) => ({ url })),
    // ];

    // console.log({ user: session?.user.email });

    const options = files ? { experimental_attachments: files } : {};
    // console.log({ files });
    handleSubmit(event, {
      body: { user_email: userEmail },
      ...options,
    });

    // append(
    //   {
    //     role: "user",
    //     content: query,
    //     experimental_attachments: messageAttachments,
    //   },
    //   {
    //     body: {
    //       model: "claude",
    //       // model: "claude-3-5-sonnet-20240620",
    //       // model: settings.model,
    //       apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
    //       // apiKey: settings.model.startsWith("gpt")
    //       //   ? settings.openaiApiKey
    //       //   : settings.anthropicApiKey,
    //     },
    //   }
    // );

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

  return (
    <>
      <div
        className={cn(
          "relative flex w-full pt-4 sm:pt-6 flex-1 overflow-x-hidden overflow-y-scroll"
        )}
        ref={scrollRef}
      >
        <div className="relative mx-auto flex h-full w-full max-w-3xl flex-1 flex-col md:px-2">
          {fetchingMessages && <Loader2Icon className="animate-spin mx-auto" />}

          {!chatId && messages.length === 0 ? (
            <div className="px-4 sm:px-0">
              <ChatInput
              userId={userId}
                files={files}
                setFiles={(f: FileList | null) => setFiles(f)}
                onAddFiles={handleAddFiles}
                hasChatMessages={messages.length === 0}
                chatId={chatId}
                input={input}
                setInput={setInput}
                onSubmit={handleSend}
                isLoading={generatingResponse}
                recording={recording}
                onStartRecord={startRecording}
                onStopRecord={stopRecording}
                attachments={attachments}
                onAddAttachment={handleAddAttachment}
                onRemoveAttachment={handleRemoveAttachment}
                showScrollButton={showScrollButton}
                handleManualScroll={handleManualScroll}
                stopGenerating={stopGenerating}
              />
            </div>
          ) : (
            <>
              <ChatMessageList
                messages={messages}
                setCurrentArtifact={setCurrentArtifact}
                containerRef={messagesRef}
              />
              <ChatInput
               userId={userId}
                files={files}
                setFiles={(f: FileList | null) => setFiles(f)}
                onAddFiles={handleAddFiles}
                hasChatMessages={messages.length === 0}
                chatId={chatId}
                input={input}
                setInput={setInput}
                onSubmit={handleSend}
                isLoading={generatingResponse}
                recording={recording}
                onStartRecord={startRecording}
                onStopRecord={stopRecording}
                attachments={attachments}
                onAddAttachment={handleAddAttachment}
                onRemoveAttachment={handleRemoveAttachment}
                showScrollButton={showScrollButton}
                handleManualScroll={handleManualScroll}
                stopGenerating={stopGenerating}
              />
            </>
          )}
        </div>
      </div>

      {currentArtifact && (
        <div className="w-full max-w-xl h-full max-h-full pt-6 pb-4">
          <ArtifactPanel
            title={currentArtifact.title}
            id={currentArtifact.id}
            type={currentArtifact.type}
            generating={currentArtifact.generating}
            content={currentArtifact.content}
            language={currentArtifact.language}
            onClose={() => setCurrentArtifact(null)}
            recording={recording}
            onCapture={handleCapture}
          />
        </div>
      )}
    </>
  );
};
