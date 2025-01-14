"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PDFChatPanel } from "./pdf-chat-panel";
import { useChat } from "ai/react";
import { toast } from "sonner";
import { Message } from "ai";
import { getPDFData, savePdfChatMessage, updatePDFChatSummary } from "@/lib/db";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Divide, Loader } from "lucide-react";
import Markdown from "@/components/markdown/markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUsageToken } from "@/lib/hooks/use-usage-token";
import { CreateNote } from "./create-note";
import { NoteList } from "./note-list";
import { reportErrorAction } from "@/actions/report-error-via-mail";

const PDFViewer = dynamic(
  () => import("./pdf-viewer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="bg-gray-50 rounded-xl py-4 grid place-items-center h-[89vh] text-gray-900">
        <div className="flex items-center gap-2">
          <Loader className="size-6 animate-spin" /> Loading...
        </div>
      </div>
    ),
  }
);

const initialMessages = [
  {
    id: "2530",
    role: "assistant",
    content: "Welcome to the chat! Ask me anything.",
  },
] as Message[];

export const TalkToPDF = ({
  pdfId,
  userId,
  userEmail,
}: {
  pdfId: string;
  userId: string;
  userEmail: string;
}) => {
  // console.log({ pdfId });

  const queryClient = useQueryClient();

  const { totalTokens, insertUsageTokens } = useUsageToken({ userId });

  // console.log({ totalTokens });

  const {
    data: pdfChatData,
    error,
    isLoading: idPDFDataLoading,
  } = useQuery({
    queryKey: ["pdfData", pdfId],
    queryFn: async () => await getPDFData({ pdfId }),
  });

  // console.log({ pdfChatData });

  const {
    messages,
    input,
    setInput,
    append,
    stop: stopGenerating,
    isLoading,
    handleSubmit,
  } = useChat({
    api: "/api/pdf-chat/chat",
    initialMessages: [
      ...initialMessages,
      ...(pdfChatData?.pdf_chat_messages || []).map(
        (message: { id: string; role: string; content: string }) => ({
          id: message.id,
          role: message.role,
          content: message.content,
        })
      ),
    ],
    onFinish: async (assistantMessage, { usage }) => {
      console.log({ assistantMessage, usage });

      savePdfChatMessage({
        pdfChatId: pdfId,
        message: assistantMessage,
      });

      insertUsageTokens({
        userId,
        userEmail,
        type: "pdfChat",
        llm: "anthropic",
        model: "claude-3-5-sonnet-20241022",
        promptTokens: usage.promptTokens,
        completionTokens: usage.completionTokens,
        totalTokens: usage.totalTokens,
      });
    },
    onError(error) {
      console.error({ chatError: error });

      toast.error(error.message, {
        position: "top-center",
      });
      reportErrorAction({
        userEmail,
        errorMessage: error.message,
        errorTrace: `[TalkToPDF] [useChat] [onError] [app/%28tools-n-course%29/%28tools%29/pdf-chat/%5Bid%5D/_components/pdf-chat-page.tsx]`,
        errorSourceUrl: "/pdf-chat/[id]",
      });
    },
    sendExtraMessageFields: true,
    body: {
      userId,
      userEmail,
      pdfChatId: pdfId,
      fileUrl: pdfChatData?.file_url ?? "",
    },
  });

  console.log({messages})

  const {
    messages: summaryMessages,
    // input,
    // setInput,
    append: summaryAppend,
    // stop: stopGenerating,
    isLoading: isSummaryLoading,
    // handleSubmit,
  } = useChat({
    api: "/api/pdf-chat/summary",
    initialMessages: [],
    onFinish: async (summaryMessage) => {
      console.log({ summaryMessage });

      await updatePDFChatSummary({
        pdfChatId: pdfId,
        summary: summaryMessage.content,
      });

      await queryClient.invalidateQueries({ queryKey: ["pdfData", pdfId] });

      // await savePdfChatMessage({
      //   pdfChatId: pdfId,
      //   message,
      // });
    },
    onError(error) {
      console.log({ chatError: error.message });

      toast.error(error.message, {
        position: "top-center",
      });
    },
    sendExtraMessageFields: true,
    body: {
      userId,
      userEmail,
    },
  });

  if (idPDFDataLoading) {
    return (
      <div className="h-full flex items-center justify-center gap-2">
        <Loader className="animate-spin size-6" /> Please wait...
      </div>
    );
  }

  if (error || !pdfChatData) {
    return <p>{error ? error.message : "Unable to load the data!"}</p>;
  }

  // console.log({ isLoading, summaryMessages });

  return (
    <div className="">
      <div className="hidden md:block p-4">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel className="pr-4">
            {" "}
            <PDFViewer
              onChatAppend={append}
              pdfChatId={pdfId}
              pdfUrl={pdfChatData.file_url}
              totalTokens={totalTokens}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="pl-4">
            <Tabs defaultValue="chat" className=" h-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger className="" value="chat">
                  Chat
                </TabsTrigger>
                <TabsTrigger value="note">Note</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="">
                <PDFChatPanel
                  onHandleChatSubmit={handleSubmit}
                  messages={messages}
                  onHandleSetInput={setInput}
                  chatInput={input}
                  isChatLoading={isLoading}
                  pdfChatId={pdfId}
                  pdfUrl={pdfChatData.file_url}
                  pdfFileName={pdfChatData.file_name}
                  userId={userId}
                  userEmail={userEmail}
                  stopGenerating={stopGenerating}
                  totalTokens={totalTokens}
                />
              </TabsContent>
              <TabsContent value="note">
                <ScrollArea className="h-[84vh] pr-4">
                  <CreateNote pdfChatId={pdfId} />
                  <NoteList pdfChatId={pdfId} />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="p-4 pb-10 block md:hidden">
        <PDFViewer
          onChatAppend={append}
          pdfChatId={pdfId}
          pdfUrl={pdfChatData.file_url}
          totalTokens={totalTokens}
        />

        <Tabs defaultValue="chat" className=" h-full mt-8 md:mt-0">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger className="" value="chat">
              Chat
            </TabsTrigger>
            <TabsTrigger value="note">Note</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="">
            <PDFChatPanel
              onHandleChatSubmit={handleSubmit}
              messages={messages}
              onHandleSetInput={setInput}
              chatInput={input}
              isChatLoading={isLoading}
              pdfChatId={pdfId}
              pdfUrl={pdfChatData.file_url}
              pdfFileName={pdfChatData.file_name}
              userId={userId}
              userEmail={userEmail}
              stopGenerating={stopGenerating}
              totalTokens={totalTokens}
            />
          </TabsContent>
          <TabsContent value="note">
            <ScrollArea className="h-[70vh] pr-4">
              <CreateNote pdfChatId={pdfId} />
              <NoteList pdfChatId={pdfId} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
