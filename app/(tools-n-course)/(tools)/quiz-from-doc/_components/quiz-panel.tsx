"use client";
import { getQuiz } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Quiz from "./quiz";
import { Loader } from "lucide-react";

export const QuizPanel = ({ quizId }: { quizId: string }) => {
  const {
    data: quiz,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["qfdQuiz", quizId],
    queryFn: async () => await getQuiz({ quizId }),
  });

  if (error) {
    console.log({ error });
    return <p>Error:{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p className="flex items-center gap-2">
        <Loader className="size-5 animate-spin" /> Loading...
      </p>
    );
  }

  return (
    <Quiz
      title={quiz.title}
      questions={quiz.qfd_questions}
      quizId={quizId}
      correctAnswers={quiz.correct_answers}
    />
  );
};
