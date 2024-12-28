"use client";

import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// import "./Sample.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui";
import { ChatRequestOptions, CreateMessage, Message } from "ai";
import { Separator } from "@/components/ui/separator";
import { savePdfChatMessage } from "@/lib/db";

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
  onChatAppend: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  pdfChatId: string;
  pdfUrl: string;
}

export function PDFViewer({ onChatAppend, pdfChatId, pdfUrl }: Props) {
  const [file, setFile] = useState<PDFFile>(
    "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/quiz-from-doc/299d3d87-8bb7-4527-b9af-137cb14c6914/A_Brief_Introduction_To_AI-NPysQAnDTG.pdf"
  );
  const [numPages, setNumPages] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [floatButtonsPosition, setFloatButtonsPosition] = useState<{
    top: number;
    left: number;
  } | null>(null); // Button position
  const floatButtonsRef = useRef(null);
  const [selection, setSelection] = useState("");
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const documentContainerRef = useRef<HTMLDivElement | null>(null);

  const onResize = useCallback<ResizeObserverCallback>(
    (entries) => {
      const [entry] = entries;

      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
    },
    []
  );

  useResizeObserver(
    documentContainerRef.current,
    resizeObserverOptions,
    onResize
  );

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
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

  const onHandleSummarize = () => {
    console.log({ selection });

    if (!selection.trim()) return;

    onChatAppend({ role: "user", content: `Summarise:\n${selection}` });

    savePdfChatMessage({
      pdfChatId: pdfChatId,
      message: { role: "user", content: `Summarise:\n${selection}` },
    });
  };

  const onHandleExplain = () => {
    console.log({ selection });

    if (!selection.trim()) return;

    onChatAppend({ role: "user", content: `Explain:\n${selection}` });

    savePdfChatMessage({
      pdfChatId: pdfChatId,
      message: { role: "user", content: `Explain:\n${selection}` },
    });
  };

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        console.log({ selection: selection.toString() });
        setSelection(selection.toString());
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (selection.toString().trim()) {
          setFloatButtonsPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
          });
        } else {
          setFloatButtonsPosition(null);
          setSelection("");
        }
      }
    };

    if (pdfContainerRef.current) {
      pdfContainerRef.current.addEventListener("mouseup", handleTextSelection);
      pdfContainerRef.current.addEventListener("touchend", handleTextSelection);
    }
    return () => {
      if (pdfContainerRef.current) {
        pdfContainerRef.current.removeEventListener(
          "mouseup",
          handleTextSelection
        );
        pdfContainerRef.current.removeEventListener(
          "touchend",
          handleTextSelection
        );
      }
    };
  }, []);

  // console.log({ render: console.count() });

  return (
    <div>
      <div className="bg-gray-200 rounded-xl py-4 relative h-full">
        <div className="flex items-center gap-2 text-black px-4 pb-4">
          <input
            onChange={(e) =>
              scrollToArticle(Number(e.target.value.trim() || 1))
            }
            defaultValue="1"
            className="w-12 bg-white border border-black px-2 rounded-md"
          />
          /<div>{numPages}</div>
        </div>

        <ScrollArea
          className="h-[82vh] px-4 rounded-xl relative"
          ref={documentContainerRef}
        >
          <div ref={pdfContainerRef} className="h-[82vh]">
            {floatButtonsPosition && (
              <div
                ref={floatButtonsRef}
                style={{
                  position: "fixed",
                  top: `${floatButtonsPosition.top}px`,
                  left: `${floatButtonsPosition.left}px`,
                  zIndex: 1000,
                }}
                className="py-1 px-2 rounded-md translate-y-full flex items-center gap-1 bg-black text-white border"
              >
                <button
                  className="hover:bg-zinc-800 py-0.5 text-sm rounded-md px-1"
                  onClick={onHandleSummarize}
                >
                  Summarize
                </button>
                <Separator orientation="vertical" className="h-6" />
                <button
                  className="hover:bg-zinc-800 py-0.5 text-sm rounded-md px-1"
                  onClick={onHandleExplain}
                >
                  Explain
                </button>

                <button
                  onClick={() => {
                    setFloatButtonsPosition(null);
                    setSelection("");
                  }}
                  className="absolute -top-3 -right-3 bg-black text-white border rounded-full size-5 flex items-center justify-center"
                >
                  X
                </button>
              </div>
            )}
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              className="space-y-4"
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
    </div>
  );
}
