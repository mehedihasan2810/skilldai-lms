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
import { Skeleton } from "@/components/ui/skeleton";
import { reportErrorAction } from "@/actions/report-error-via-mail";

const PDFViewer = dynamic(
  () => import("./pdf-viewer").then((mod) => mod.PDFViewer),
  { ssr: false }
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

  const {
    data: pdfChatData,
    error,
    isLoading: idPDFDataLoading,
  } = useQuery({
    queryKey: ["NCERTPdfData", pdfId],
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
    onFinish: async (assistantMessage) => {
      console.log({ assistantMessage });

      await savePdfChatMessage({
        pdfChatId: pdfId,
        message: assistantMessage,
      });
    },
    onError(error) {
      console.log({ chatError: error.message });

      toast.error(error.message, {
        position: "top-center",
      });
      reportErrorAction({
        userEmail,
        errorMessage: error.message,
        errorTrace: `[TalkToPDF] [useChat] [onError] [app/%28tools-n-course%29/%28tools%29/ncert/%5Bid%5D/_components/pdf-chat-page.tsx]`,
        errorSourceUrl: "/pdf-chat",
      });
    },
    sendExtraMessageFields: true,
    body: {
      userId,
      userEmail,
    },
  });

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
      reportErrorAction({
        userEmail,
        errorMessage: error.message,
        errorTrace: `[TalkToPDF] [useChat] [onError] [app/%28tools-n-course%29/%28tools%29/ncert/%5Bid%5D/_components/pdf-chat-page.tsx]`,
        errorSourceUrl: "/pdf-chat",
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

  console.log({ isLoading, summaryMessages });

  return (
    <div className="">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel className="pr-4">
          {" "}
          <PDFViewer
            pdfUrl={pdfChatData.file_url}
            onChatAppend={append}
            pdfChatId={pdfId}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="pl-4">
          <Tabs defaultValue="chat" className=" h-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger className="" value="chat">
                Chat
              </TabsTrigger>
              <TabsTrigger
                onClick={() => {
                  if (pdfChatData.summary || isSummaryLoading) return;

                  summaryAppend(
                    {
                      role: "user",
                      content: `Summarise this pdf document please.`,
                    },
                    {
                      experimental_attachments: [
                        {
                          name: pdfChatData.file_name,
                          url: pdfChatData.file_url,
                          contentType: "application/pdf",
                        },
                      ],
                    }
                  );
                }}
                value="summary"
              >
                {isSummaryLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="size-5 animate-spin" /> Summarising...
                  </div>
                ) : (
                  "Summary"
                )}
              </TabsTrigger>
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
              />
            </TabsContent>
            <TabsContent value="summary">
              {(summaryMessages[summaryMessages.length - 1]?.role === "user" ||
                (summaryMessages[summaryMessages.length - 1]?.role ===
                  "assistant" &&
                  summaryMessages[summaryMessages.length - 1]?.content ===
                    "")) &&
              isSummaryLoading ? (
                <div className="flex flex-col gap-2 pt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[95%]" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[85%]" />
                </div>
              ) : (
                <ScrollArea className="h-[85vh]">
                  <Markdown
                    text={
                      pdfChatData.summary || summaryMessages[1]?.content || ""
                    }
                    className="p-4"
                  />
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
