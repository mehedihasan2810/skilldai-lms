"use client";
import Markdown from "@/components/markdown/markdown";
import { Button, buttonVariants } from "@/components/ui";
import { Check, Copy, Download, FileText, Printer } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getSummary } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import markdownToTxt from "markdown-to-txt";
import { EditSummariseDialog } from "./edit-dialog";

export const SummaryPage = ({ userId, id }: { userId: string; id: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const {
    data: summary,
    error,
    isLoading,
  } = useQuery<{ title: string; summary: string }>({
    queryKey: ["summary", id],
    queryFn: async () => await getSummary({ summaryId: id }),
  });

  const handleCopy = async () => {
    try {
      const texts = markdownToTxt(summary?.summary ?? "");
      await navigator.clipboard.writeText(`${summary?.title}\n\n${texts}`);
      setIsCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error(`Failed to copy text: ${(err as Error).message}`);
    }
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const texts = markdownToTxt(summary?.summary ?? "");
    const file = new Blob([`${summary?.title}\n\n${texts}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "my-summary.txt";
    // document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handlePrint = () => {
    const plainText = markdownToTxt(summary?.summary ?? "");
    // Wrap the plain text in preformatted tags for better readability
    const formattedText = `<pre>${summary?.title}\n\n${plainText}</pre>`;
    printText(formattedText);
  };

  function printText(content: string) {
    const printWindow = window.open("", "_blank")!;
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Text</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              line-height: 1.6;
              font-size: 20px;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  console.log({ summary });

  return (
    <div className="mb-16 mt-8 bg-card rounded-xl p-6 w-full max-w-4xl mx-auto shadow-md border border-border/50">
      {error ? (
        <p>Error: {error.message}</p>
      ) : isLoading ? (
        <div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-24 h-9" />
            <Skeleton className="w-24 h-9" />
            <Skeleton className="w-24 h-9" />
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center flex-wrap gap-4 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({
                  className: "flex items-center gap-2",
                })}
              >
                <Download className="size-5" /> Download
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={downloadTxtFile}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="size-5" /> Text
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleCopy} className="flex items-center gap-2">
              {isCopied ? (
                <Check className="size-5" />
              ) : (
                <Copy className="size-5" />
              )}{" "}
              Copy
            </Button>
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="size-5" /> Print
            </Button>

            <EditSummariseDialog summary={summary?.summary ?? ""} summaryId={id} />
          </div>

          {/* <h1 className="text-2xl font-bold mb-2 mt-6">{summary?.title}</h1> */}
          <Markdown text={summary?.summary ?? ""} className="max-w-4xl" />
        </>
      )}
    </div>
  );
};
