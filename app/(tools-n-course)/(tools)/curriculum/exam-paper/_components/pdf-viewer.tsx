"use client";

import { useCallback, useRef, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui";
import { createNCERTChat } from "@/lib/db";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { reportErrorAction } from "@/actions/report-error-via-mail";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

interface Props {
  pdfUrl: string;
  sourcePage?: string;
  userId: string;
}

export function PDFViewer({ pdfUrl, sourcePage, userId }: Props) {

  const [numPages, setNumPages] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>();

  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const documentContainerRef = useRef<HTMLDivElement | null>(null);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(
    documentContainerRef.current,
    resizeObserverOptions,
    onResize
  );

  function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }): void {
    setNumPages(nextNumPages);
  }

  const scrollToArticle = (pageNumber: number) => {
    const articleElement = document.getElementById(`pdfpage-${pageNumber}`);
    if (articleElement) {
      articleElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const router = useRouter();

  const createNCERTChatMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string; pdfUrl: string }) =>
      await createNCERTChat({
        userId,
        pdfUrl,
      }),
    onSuccess: async (createdChat) => {
      console.log({ createdChat });

      router.push(`/pdf-chat/${createdChat.id}`);
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message);
      reportErrorAction({
        userEmail: "Unknown",
        errorMessage: (error as Error).message,
        errorTrace: `[PDFViewer] [createNCERTChatMutation] [onError] [app/%28tools-n-course%29/%28tools%29/ncert/_components/pdf-viewer.tsx]`,
        errorSourceUrl: "/pdf-viewer",
      });
    },
  });

  return (
    <div className="bg-gray-50 rounded-xl py-4 relative h-full">
      <div className="flex justify-between items-center px-4 pb-4">
        <div className="flex items-center gap-2 text-black ">
          <input
            onChange={(e) =>
              scrollToArticle(Number(e.target.value.trim() || 1))
            }
            defaultValue="1"
            className="w-12 bg-white border border-black px-2 rounded-md"
          />
          /<div>{numPages}</div>
        </div>
        {sourcePage ? (
          <Button
            onClick={() => {
              createNCERTChatMutation.mutate({ userId, pdfUrl });
            }}
            disabled={createNCERTChatMutation.isPending}
          >
            {createNCERTChatMutation.isPending && (
              <Loader className="animate-spin" />
            )}
            Chat with this PDF
          </Button>
        ) : (
          <div></div>
        )}
      </div>

      <ScrollArea
        className="h-[70vh] md:h-[80vh] px-4 rounded-xl relative w-[calc(100dvw-32px)] md:w-auto"
        ref={documentContainerRef}
      >
        <div ref={pdfContainerRef} className="h-[70vh] md:h-[80vh]">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            className="space-y-4 text-black"
          >
            {Array.from(new Array(numPages), (_el, index) => (
              <div key={`page-${index + 1}`} id={`pdfpage-${index + 1}`}>
                <Page
                  pageNumber={index + 1}
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
                />
              </div>
            ))}
          </Document>
        </div>
      </ScrollArea>
    </div>
  );
}
