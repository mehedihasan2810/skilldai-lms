"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";
import { toast } from "sonner";
import { FileUp, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { questionsSchema } from "@/lib/schemas";
import { generateQuizTitle } from "@/actions/generate-quiz-title";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "nextjs-toploader/app";
import { shortUid } from "@/lib/utils";


export function CreateQuizFromDocPanel({ userId, userEmail }: { userId: string,  userEmail: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>(
    []
  );
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState<string>();
  const [isQuizSaving, setIsQuizSaving] = useState(false);

  const router = useRouter();

  const {
    submit,
    object: partialQuestions,
    isLoading,
  } = useObject({
    api: "/api/generate-quiz-from-document",
    schema: questionsSchema,
    initialValue: undefined,
    onError: (quizGenerateError) => {
      console.log({ quizGenerateError });
      toast.error(quizGenerateError.message.trim() || "Failed to generate quiz. Please try again.");
      setFiles([]);
    },
    onFinish: async ({ object }) => {
      try {
        if (!object) {
          throw new Error("No quizzes generated! Please try again.");
        }

        const res = questionsSchema.safeParse(object);
        if (res.error) {
          throw new Error(res.error.errors.map((e) => e.message).join("\n"));
        }

        setIsQuizSaving(true);

        const supabase = createClient();

        const generatedTitle = await generateQuizTitle(files[0].name);

        console.log({ generatedTitle });

        // setTitle(generatedTitle);

        const { data: fileSaveRes, error: fileSaveErr } = await supabase.storage
          .from("quiz-from-doc")
          .upload(
            `${userId}/${files[0].name
              .replace(".pdf", "")
              .replaceAll(" ", "-")}-${shortUid.rnd()}.pdf`,
            files[0]
          );

        console.log({ fileSaveRes, fileSaveErr });

        const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileSaveRes?.fullPath}`;

        console.log({ fileUrl });

        const { error: quizError, data: quizData } = await supabase
          .from("qfd_quiz")
          .insert({
            title: generatedTitle,
            user_id: userId,
            file_name: files[0].name,
            file_url: fileSaveRes ? fileUrl : "",
            correct_answers: [],
          })
          .select("id")
          .single();

        if (quizError) {
          console.log({ quizError });
          throw new Error(quizError.message);
        }
        console.log({ quizData });

        const questions = object.map((q) => ({
          quiz_id: quizData?.id,
          question: q.question,
          answer: q.answer,
          options: q.options,
        }));

        const { error: questionError, data: quizQuestions } = await supabase
          .from("qfd_questions")
          .insert(questions)
          .select("id");

        if (questionError) {
          console.log({ questionError });
          throw new Error(questionError.message);
        }

        console.log({ quizQuestions });

        setIsQuizSaving(false);
        setQuestions(object ?? []);

        router.push(`/quiz-from-doc/${quizData.id}`);
      } catch (error) {
        console.log({ error });
        setIsQuizSaving(false);
        toast.error((error as Error).message);
      }
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari && isDragging) {
      toast.error(
        "Safari does not support drag & drop. Please use the file picker."
      );
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024
    );
    console.log(validFiles);

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.");
      return;
    }

    setFiles(validFiles);
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
    const encodedFiles = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await encodeFileAsBase64(file),
      }))
    );
    console.log({ encodedFiles });
    submit({ files: encodedFiles, userId, userEmail });
    // const generatedTitle = await generateQuizTitle(encodedFiles[0].name);
    // setTitle(generatedTitle);

    // setTitle("hello");
  };

  // const clearPDF = () => {
  //   setFiles([]);
  //   setQuestions([]);
  // };

  const progress = partialQuestions ? (partialQuestions.length / 10) * 100 : 0;

  // if (questions.length === 4) {
  //   return (
  //     <Quiz title={title ?? "Quiz"} questions={questions} clearPDF={clearPDF} />
  //   );
  // }

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
            <div>Drag and drop files here. Max 5MB</div>
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
            <CardTitle className="text-2xl font-bold">
              PDF Quiz Generator
            </CardTitle>
           
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
                accept="application/pdf"
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
              disabled={files.length === 0 || isLoading || isQuizSaving}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating Quiz...</span>
                </span>
              ) : (
                "Generate Quiz"
              )}
            </Button>
          </form>
        </CardContent>
        {(isLoading || isQuizSaving) && (
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="w-full space-y-2">
              <div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
                <div
                  className={`h-2 w-2 rounded-full ${
                    isLoading ? "bg-yellow-500/50 animate-pulse" : "bg-muted"
                  }`}
                />
                <span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
                  {partialQuestions
                    ? `Generating question ${partialQuestions.length} of maximum 10`
                    : "Analyzing PDF content"}
                </span>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
