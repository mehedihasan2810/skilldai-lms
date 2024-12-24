"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import * as z from "zod";
import { useRouter } from "nextjs-toploader/app";
import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import { toast } from "sonner";
import { FileUp, Loader, Loader2, Plus } from "lucide-react";
import Markdown from "@/components/markdown/markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveSummary } from "@/lib/db";
import { AnimatePresence, motion } from "framer-motion";
import { getMimeType } from "@/lib/utils";

const outputSchema = z.object({
  title: z.string().describe("A max eight-word title for the summary."),
  summary: z.string().describe("A concise summary of the document/image."),
});

export const formSchema = z.object({
  topic: z.string().trim().min(1, { message: "Required" }),
  gradeLevel: z.string(),
  numOfQuestions: z.coerce.number().max(20, { message: "Max questions: 20" }),
});

export const AISummarizerPage = ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const queryClient = useQueryClient();

  const router = useRouter();

  const saveSummaryMutation = useMutation({
    mutationFn: async ({
      userId,
      title,
      summary,
      fileName,
      fileUrl,
    }: {
      userId: string;
      title: string;
      summary: string;
      fileName: string;
      fileUrl: string;
    }) =>
      await saveSummary({
        userId,
        title,
        summary,
        fileName,
        fileUrl,
      }),
    onSuccess: async (savedData) => {
      console.log({ savedData });

      await queryClient.invalidateQueries({ queryKey: ["summaryList"] });

      router.push(`/ai-summariser/${savedData.id}`);
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message);
    },
  });

  const {
    submit,
    object: summary,
    isLoading,
  } = useObject({
    api: "/api/ai-summarizer",
    schema: outputSchema,
    // initialValue: undefined,
    onError: (worksheetsError) => {
      console.log({ worksheetsError });
      toast.error(worksheetsError.message);
    },
    onFinish: async ({ object }) => {
      console.log({ object });
      try {
        if (!object) {
          throw new Error("Something went wrong!");
        }
        console.log({ object });

        saveSummaryMutation.mutate({
          title: object.title,
          summary: object.summary,
          userId: userId,
          fileName: "",
          fileUrl: "",
        });
      } catch (error) {
        console.log({ error });
        toast.error((error as Error).message);
      }
    },
  });

  console.log({ summary });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari && isDragging) {
      toast.error(
        "Safari does not support drag & drop. Please use the file picker."
      );
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    console.log({ selectedFiles });
    const validFiles = selectedFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024
    );
    // const validFiles = selectedFiles.filter(
    //   (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024
    // );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.");
      return;
    }

    setFiles(selectedFiles);
  };

  const encodeFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mimeType = getMimeType(files[0].name);

    console.log({ mimeType });

    const encodedFiles = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: getMimeType(file.name),
        data: await encodeFileAsBase64(file),
      }))
    );

    if (encodedFiles[0].type === "unknown") {
      toast.error("File is not supported!");
      return;
    }

    submit({ files: encodedFiles, userId, userEmail });
    // const generatedTitle = await generateQuizTitle(encodedFiles[0].name);
    // setTitle(generatedTitle);

    // setTitle("hello");
  };

  if ((summary && isLoading) || saveSummaryMutation.isPending) {
    return (
      <>
        <div className="relative mb-16 mt-8 bg-card w-full rounded-xl p-6 max-w-4xl mx-auto shadow-md border border-border/50">
          <Button
            variant="outline"
            className="absolute -top-5 left-1/2 -translate-x-1/2 mb-2"
          >
            <Loader className="size-5 animate-spin mr-2" /> Generating...
          </Button>
          {/* <h1 className="text-2xl font-bold mb-2 mt-6">
            {summary?.title ?? ""}
          </h1> */}
          <Markdown text={summary?.summary ?? ""} className="max-w-4xl" />
        </div>
      </>
    );
  }

  return (
    <div
      className="w-full flex justify-center"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragExit={() => setIsDragging(false)}
      onDragEnd={() => setIsDragging(false)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        console.log(e.dataTransfer.files);
        handleFileChange({
          target: { files: e.dataTransfer.files },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="fixed pointer-events-none dark:bg-zinc-900/90 h-dvh w-dvw z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>Drag and drop files here. Max 5MB.</div>
            <div className="text-sm dark:text-zinc-400 text-zinc-500">
              {"(PDFs only)"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Card className="w-full max-w-2xl h-full border-0 sm:border sm:h-fit mt-12">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto flex items-center justify-center space-x-2 text-muted-foreground">
            <div className="rounded-full bg-primary/10 p-2">
              <FileUp className="h-6 w-6" />
            </div>
            <Plus className="h-4 w-4" />
            <div className="rounded-full bg-primary/10 p-2">
              <Loader2 className="h-6 w-6" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">AI Summariser</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitWithFiles} className="space-y-4">
            <div
              className={`relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 transition-colors hover:border-muted-foreground/50`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                // accept="application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <FileUp className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center">
                {files.length > 0 ? (
                  <span className="font-medium text-foreground">
                    {files[0].name}
                  </span>
                ) : (
                  <span>Drop your PDF here or click to browse. Max 5MB.</span>
                )}
              </p>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={
                files.length === 0 || isLoading || saveSummaryMutation.isPending
              }
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Summarizing...</span>
                </span>
              ) : (
                "Summarize"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
