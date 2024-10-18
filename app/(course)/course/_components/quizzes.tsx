import { Button } from "@/components/ui";
import { updateSectionCompletion } from "@/lib/db";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const alphabet = ["A", "B", "C", "D"];

export const Quizzes = ({
  quizzes,
  userId,
  sectionId,
  completedUsers,
}: {
  quizzes: {
    id: string;
    question: string;
    answer: string;
    options: string[];
  }[];
  userId: string;
  sectionId: string;
  completedUsers: string[];
}) => {
  //   console.log({ quizzes });

  const updateSectionCompletionMutation = useMutation({
    mutationFn: async ({
      userId,
      sectionId,
      completedUsers,
    }: {
      userId: string;
      sectionId: string;
      completedUsers: string[];
    }) => await updateSectionCompletion(userId, sectionId, completedUsers),
    onSuccess: (updatedSectionCompletedUsers) => {
      console.log({ updatedSectionCompletedUsers });

      //   toast.success("Feedback has been successfully sent.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="bg-secondary text-secondary-foreground p-4 md:p-6 rounded-md space-y-4">
      {quizzes.map((quiz, i) => (
        <div
          key={i}
          className="bg-background text-foreground rounded-md p-4 md:p-6"
        >
          <div className="flex items-center gap-4 font-semibold mb-4 text-lg">
            {i + 1}. {quiz.question}
          </div>

          <div className="border border-black/40 dark:border-border rounded-md overflow-hidden">
            {quiz.options.map((option, index) => (
              <div
                key={option}
                className={cn(
                  "bg-secondary text-secondary-foreground p-4   flex items-center gap-3 hover:bg-secondary/50",
                  {
                    "border-b border-black/40 dark:border-border":
                      (index + 1) !== quiz.options.length,
                  }
                )}
              >
                <div className="size-8 rounded-full flex justify-center items-center bg-sky-800 text-sky-300 text-lg">
                  {alphabet[index]}
                </div>
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button className="w-full" size="lg">
        Check Answer
      </Button>
    </div>
  );
};
