"use client";
import { getQuiz } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Quiz from "./quiz";

export const QuizPanel = ({ quizId }: { quizId: string }) => {
  const {
    data: quiz,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["qfdQuiz"],
    queryFn: async () => await getQuiz({ quizId }),
  });

  if (error) {
    console.log({ error });
    return <p>Error:{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
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
