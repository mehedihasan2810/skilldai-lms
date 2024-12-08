"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  RefreshCw,
  FileText,
  Loader,
} from "lucide-react";
import { Question } from "@/lib/schemas";
import { QuizScore } from "./score";
import { QuizReview } from "./quiz-overview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetQFDQuiz, updateQFDQuizAnswers } from "@/lib/db";
import Link from "next/link";
import { toast } from "sonner";

type QuizProps = {
  questions: Question[];
  // clearPDF: () => void;
  title: string;
  quizId: string;
  correctAnswers: string[];
};

export default function Quiz({
  questions,
  // clearPDF,
  title = "Quiz",
  quizId,
  correctAnswers,
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const queryClient = useQueryClient();

  const updateQuizQuestionMutation = useMutation({
    mutationFn: async ({
      quizId,
      answersInput,
    }: {
      quizId: string;
      answersInput: string[];
    }) => await updateQFDQuizAnswers({ answersInput, quizId }),
    onSuccess: (updateQuestionData) => {
      console.log({ updateQuestionData });
      queryClient.invalidateQueries({ queryKey: ["qfdQuiz"] });
    },
    onError: (updateQuestionError) => {
      console.log({ updateQuestionError });
      toast.error(updateQuestionError.message);
    },
  });

  const resetQuizMutation = useMutation({
    mutationFn: async ({ quizId }: { quizId: string }) =>
      await resetQFDQuiz({ quizId }),
    onSuccess: async (resetQuizData) => {
      console.log({ resetQuizData });
      await queryClient.invalidateQueries({ queryKey: ["qfdQuiz", quizId] });

      setCurrentQuestionIndex(0);
      setProgress(0);
      setIsSubmitted(false);
      setAnswers(Array(questions.length).fill(null));
    },
    onError: (resetQuizError) => {
      console.log({ resetQuizError });
      toast.error(resetQuizError.message);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((currentQuestionIndex / questions.length) * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, questions.length]);

  const handleSelectAnswer = (answer: string) => {
    if (!isSubmitted) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = answer;
      setAnswers(newAnswers);
      console.log(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    console.log(quizId, answers);
    updateQuizQuestionMutation.mutate({ quizId, answersInput: answers });

    setIsSubmitted(true);
    const correctAnswers = questions.reduce((acc, question, index) => {
      return acc + (question.answer === answers[index] ? 1 : 0);
    }, 0);
    setScore(correctAnswers);
  };

  const handleReset = () => {
    resetQuizMutation.mutate({ quizId });
    // setAnswers(Array(questions.length).fill(null));
    // setIsSubmitted(false);
    // setScore(null);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const totalScores = questions?.reduce((acc, question, index) => {
    return acc + (question.answer === correctAnswers[index] ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
          {title}
        </h1>
        <div className="relative">
          {!isSubmitted && <Progress value={progress} className="h-2.5 mb-8" />}
          <div className="min-h-[400px]">
            {" "}
            {/* Prevent layout shift */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isSubmitted ? "results" : currentQuestionIndex}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* {!isSubmitted ? ( */}
                {correctAnswers.length !== questions.length ? (
                  <div className="space-y-8">
                    <QuestionCard
                      question={currentQuestion}
                      selectedAnswer={answers[currentQuestionIndex]}
                      onSelectAnswer={handleSelectAnswer}
                      isSubmitted={isSubmitted}
                      showCorrectAnswer={false}
                    />
                    <div className="flex justify-between items-center pt-4">
                      <Button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        variant="secondary"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>
                      <span className="text-sm font-medium">
                        {currentQuestionIndex + 1} / {questions.length}
                      </span>
                      <Button
                        onClick={handleNextQuestion}
                        disabled={answers[currentQuestionIndex] === null || updateQuizQuestionMutation.isPending}
                        variant="secondary"
                        className="flex items-center gap-2"
                      >
                        {currentQuestionIndex === questions.length - 1 ? (
                          <>
                            {updateQuizQuestionMutation.isPending && (
                              <Loader className="size-5 animate-spin" />
                            )}{" "}
                            Submit
                          </>
                        ) : (
                          "Next"
                        )}{" "}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <QuizScore
                      // correctAnswers={score ?? 0}
                      correctAnswers={totalScores ?? 0}
                      totalQuestions={questions.length}
                    />
                    <div className="space-y-12">
                      <QuizReview
                        questions={questions}
                        userAnswers={correctAnswers}
                      />
                    </div>
                    <div className="flex justify-center space-x-4 pt-4">
                      <Button
                        disabled={resetQuizMutation.isPending}
                        onClick={handleReset}
                        variant="outline"
                        className="bg-muted hover:bg-muted/80 w-full"
                      >
                        {resetQuizMutation.isPending ? (
                          <Loader className="size-5 animate-spin" />
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" /> Reset Quiz
                          </>
                        )}
                      </Button>
                      <Link
                        href="/quiz-from-doc"
                        // onClick={clearPDF}
                        className={buttonVariants({
                          className: "bg-primary hover:bg-primary/90 w-full",
                        })}
                      >
                        <FileText className="mr-2 h-4 w-4" /> Try Another PDF
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

const QuestionCard: React.FC<{
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  isSubmitted: boolean;
  showCorrectAnswer: boolean;
}> = ({ question, selectedAnswer, onSelectAnswer, showCorrectAnswer }) => {
  const answerLabels = ["A", "B", "C", "D"];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold leading-tight">
        {question.question}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant={
              selectedAnswer === answerLabels[index] ? "default" : "outline"
            }
            className={`h-auto py-6 px-4 justify-start text-left whitespace-normal ${
              showCorrectAnswer && answerLabels[index] === question.answer
                ? "bg-green-600 hover:bg-green-700"
                : showCorrectAnswer &&
                  selectedAnswer === answerLabels[index] &&
                  selectedAnswer !== question.answer
                ? "bg-red-600 hover:bg-red-700"
                : ""
            }`}
            onClick={() => onSelectAnswer(answerLabels[index])}
          >
            <span className="text-lg font-medium mr-4 shrink-0">
              {answerLabels[index]}
            </span>
            <span className="flex-grow">{option}</span>
            {(showCorrectAnswer && answerLabels[index] === question.answer) ||
              (selectedAnswer === answerLabels[index] && (
                <Check className="ml-2 shrink-0 text-white" size={20} />
              ))}
            {showCorrectAnswer &&
              selectedAnswer === answerLabels[index] &&
              selectedAnswer !== question.answer && (
                <X className="ml-2 shrink-0 text-white" size={20} />
              )}
          </Button>
        ))}
      </div>
    </div>
  );
};
