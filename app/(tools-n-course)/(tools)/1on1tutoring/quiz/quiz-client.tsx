// app/quiz/quiz-client.tsx (Client Component)
"use client";

import { useQuery } from "@tanstack/react-query";
import QuizPage from "./chat";
import { Loader } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizClientProps {
  subject: string;
  proficiency: string;
  userEmail:string;
  userId:string;
  chatId:string;
}

async function fetchQuizQuestions({ subject, proficiency,userEmail,userId ,chatId}: QuizClientProps) {
  const response = await fetch("/api/1on1tutoring/generate-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, proficiency,userEmail,userId ,chatId}),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quiz questions.");
  }

  return response.json() as Promise<{ questions: QuizQuestion[] }>;
}

export default function QuizClient({ subject, proficiency,userEmail,userId,chatId}: QuizClientProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["quiz", subject, proficiency,userEmail,userId,chatId],
    queryFn: () => fetchQuizQuestions({ subject, proficiency ,userEmail,userId,chatId}),
    enabled: !!subject && !!proficiency && !!userEmail&& !!userId,
  });

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center gap-2">
          <Loader className="animate-spin size-6" /> Please wait...
        </div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error loading quiz: {(error as Error).message}
      </div>
    );
  }

  if (!data?.questions) {
    return <div className="min-h-screen flex items-center justify-center">No questions available</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <QuizPage questions={data.questions} subject={subject}  userId={userId} userEmail={userEmail} chatId={chatId} proficiency={proficiency}/>
    </div>
  );
}