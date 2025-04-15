'use client';

import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Markdown from '@/components/markdown/markdown';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  progress: number;
  weak: boolean;
  contents: string;
  practice: string[];
  quiz: { question: string; options: string[]; correct: number }[];
}

interface ContentTabsProps {
  module: Module;
  chatId: string;
  userId: string;
  initialAnswers?: (number | null)[];
  initialProgress?: number;
  initialIsCompleted?: boolean;
  onProgressUpdate?: (moduleId: number, newProgress: number, isCompleted: boolean) => void;
}

export default function ContentTabs({
  module,
  chatId,
  userId,
  initialAnswers = new Array(module.quiz.length).fill(null),
  initialProgress = module.progress,
  initialIsCompleted = false,
  onProgressUpdate,
}: ContentTabsProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(initialAnswers);
  const [submitted, setSubmitted] = useState(initialIsCompleted);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Reset answers when module changes
  React.useEffect(() => {
    setAnswers(new Array(module.quiz.length).fill(null));
    setSubmitted(initialIsCompleted);
  }, [module.id, module.quiz.length, initialIsCompleted]);

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = optionIndex;
      return newAnswers;
    });
  };

// contenttabs.tsx
const handleFinalSubmit = async () => {
  if (isSubmitting || submitted) return;
  setIsSubmitting(true);

  // Validate: Require at least one answer
  if (answers.every((ans) => ans === null)) {
    toast.error("Please select at least one answer.", {
      position: "top-center",
      duration: 3000,
    });
    setIsSubmitting(false);
    return;
  }

  // Validate answers length matches quiz length
  if (answers.length !== module.quiz.length) {
    toast.error("Invalid answers data.", {
      position: "top-center",
      duration: 3000,
    });
    setIsSubmitting(false);
    return;
  }

  // Calculate correctness
  const correctAnswers = new Set<number>();
  answers.forEach((ans, i) => {
    if (ans !== null && ans === module.quiz[i].correct) {
      correctAnswers.add(i);
    }
  });

  const totalQuestions = module.quiz.length;
  const correctCount = correctAnswers.size;
  const newProgress = Math.round((correctCount / totalQuestions) * 100);
  const isCompleted = answers.every((ans) => ans !== null);

  // Store data
  try {
    const response = await fetch('/api/1on1tutoring/module-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId,
        userId,
        moduleId: module.id,
        progress: newProgress,
        answers, // Send only the current module's answers
        isCompleted,
      }),
    });

    if (!response.ok) throw new Error('Failed to save progress');

    // Notify parent
    onProgressUpdate?.(module.id, newProgress, isCompleted);

    // Invalidate query for this module to refresh data
    await queryClient.invalidateQueries({
      queryKey: ['progress', chatId, userId],
    });

    setSubmitted(true);
    toast.success(`Submitted! You got ${correctCount} out of ${totalQuestions} correct.`, {
      position: "top-center",
      duration: 3000,
    });

    if (newProgress > initialProgress) {
      toast.success(`Progress updated to ${newProgress}%!`, {
        position: "top-center",
        duration: 3000,
      });
    }
    if (isCompleted && !initialIsCompleted) {
      toast.success("Quiz Completed!", {
        position: "top-center",
        duration: 3000,
      });
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    toast.error("Failed to save progress. Please try again.", {
      position: "top-center",
      duration: 3000,
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Tabs defaultValue="learn" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="learn">Learn</TabsTrigger>
        <TabsTrigger value="practice">Practice</TabsTrigger>
        <TabsTrigger value="quiz">Quiz</TabsTrigger>
      </TabsList>
      <TabsContent value="learn" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{module.title} - Learn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Markdown text={module.contents} className="max-w-2xl break-all text-center w-full" />
            {module.weak && (
              <p className="text-red-500">
                Focus on this module to improve your skills.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="practice" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{module.title} - Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {module.practice.length > 0 ? (
              module.practice.map((task, index) => (
                <Markdown key={index} text={task} className="max-w-2xl break-all" />
              ))
            ) : (
              <p>No practice questions available.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="quiz" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{module.title} - Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {module.quiz.length > 0 ? (
              <>
                {module.quiz.map((q, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p>Question {index + 1}: {q.question}</p>
                      {submitted && (
                        answers[index] !== null ? (
                          answers[index] === q.correct ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-500" />
                        )
                      )}
                    </div>
                    <div className="space-y-2">
                      {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`q${index}-o${optIndex}`}
                            name={`q${index}`}
                            checked={answers[index] === optIndex}
                            onChange={() => handleQuizAnswer(index, optIndex)}
                            disabled={submitted}
                          />
                          <label
                            htmlFor={`q${index}-o${optIndex}`}
                            className={`ml-2 ${
                              submitted && optIndex === q.correct ? 'text-green-500 font-bold' : ''
                            }`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    {submitted && answers[index] !== null && answers[index] !== q.correct && (
                      <p className="text-sm text-green-500">
                        Correct answer: {q.options[q.correct]}
                      </p>
                    )}
                  </div>
                ))}
                <Button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting || submitted}
                  className="mt-4"
                >
                  {submitted ? 'Submitted' : isSubmitting ? 'Submitting...' : 'Final Submit'}
                </Button>
              </>
            ) : (
              <p>No quiz questions available.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}