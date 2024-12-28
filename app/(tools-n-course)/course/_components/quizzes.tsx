import { Button } from "@/components/ui";
import { updateQuizResult, updateSectionCompletion } from "@/lib/db";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Divide, Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const alphabet = ["A", "B", "C", "D"];

export const Quizzes = ({
  quizzes,
  userId,
  sectionId,
  completedUsers,
  quizzesResult,
  courseSlug,
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
  quizzesResult: Record<string, any>;
  courseSlug: string;
}) => {
  const queryClient = useQueryClient();
  console.log({ quizzes });

  const [selectedQuizzes, setSelectedQuizzes] = useState<Record<string, any>>(
    {
      isChecked: false,
    }
  );

  console.log({ selectedQuizzes, quizzesResult });

  const updateQuizMutation = useMutation({
    mutationFn: async ({
      sectionId,
      result,
    }: {
      sectionId: string;
      result: Record<string, any>;
    }) => await updateQuizResult(sectionId, result),
  });

  const userQuizzesResult = quizzesResult[userId] ?? {};

  console.log({userQuizzesResult})

  useEffect(() => {
    setSelectedQuizzes({
      isChecked: false,
    });
  }, [sectionId]);

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
            {quiz.options.map((option, index) =>
              userQuizzesResult.isChecked ? (
                <button
                  disabled={userQuizzesResult.isChecked}
                  // onClick={() => {
                  //   setSelectedQuizzes((q) => ({
                  //     ...q,
                  //     [quiz.id]: [quiz.id, option],
                  //   }));
                  // }}
                  key={option}
                  className={cn(
                    "bg-secondary text-secondary-foreground p-4   flex items-center gap-3  w-full",
                    {
                      "border-b border-black/40 dark:border-border":
                        index + 1 !== quiz.options.length,
                      // "bg-primary text-primary-foreground hover:bg-none":
                      //   userQuizzesResult[quiz.id]?.includes(option) &&
                      //   userQuizzesResult[quiz.id]?.includes(quiz.answer),
                      "bg-primary text-primary-foreground hover:bg-none border-none":
                        option === quiz.answer,
                      "bg-destructive text-destructive-foreground hover:bg-none border-none":
                        userQuizzesResult[quiz.id]?.includes(option) &&
                        !userQuizzesResult[quiz.id]?.includes(quiz.answer),
                    }
                  )}
                >
                  <div
                    className={cn(
                      "size-8 rounded-full flex justify-center items-center  text-lg bg-primary text-primary-foreground",
                      {
                        "bg-card/20": option === quiz.answer,
                        "bg-card/20 ":
                          userQuizzesResult[quiz.id]?.includes(option) &&
                          !userQuizzesResult[quiz.id]?.includes(quiz.answer),
                      }
                    )}
                  >
                    {option === quiz.answer ? (
                      <Check />
                    ) : userQuizzesResult[quiz.id]?.includes(option) &&
                      !userQuizzesResult[quiz.id]?.includes(quiz.answer) ? (
                      <X />
                    ) : (
                      alphabet[index]
                    )}
                  </div>
                  {option}
                </button>
              ) : (
                <button
                  disabled={selectedQuizzes.isChecked}
                  onClick={() => {
                    setSelectedQuizzes((q) => ({
                      ...q,
                      [quiz.id]: [quiz.id, option],
                    }));
                  }}
                  key={option}
                  className={cn(
                    "bg-secondary text-secondary-foreground p-4   flex items-center gap-3  w-full",
                    {
                      "border-b border-black/40 dark:border-border":
                        index + 1 !== quiz.options.length,
                      "bg-primary text-primary-foreground hover:bg-none":
                        selectedQuizzes[quiz.id]?.includes(option),
                      "hover:bg-secondary/50":
                        !selectedQuizzes[quiz.id]?.includes(option),
                    }
                  )}
                >
                  <div
                    className={cn(
                      "size-8 rounded-full flex justify-center items-center  text-lg",
                      {
                        "bg-card/20":
                          selectedQuizzes[quiz.id]?.includes(option),
                        "bg-primary text-primary-foreground":
                          !selectedQuizzes[quiz.id]?.includes(option),
                      }
                    )}
                  >
                    {alphabet[index]}
                  </div>
                  {option}
                </button>
              )
            )}
          </div>
          {userQuizzesResult.isChecked && (
            <div className="mt-4">
              Answer:{" "}
              <span className="font-bold text-primary">{quiz.answer}</span>
            </div>
          )}
        </div>
      ))}

      <Button
        disabled={
          userQuizzesResult.isChecked ||
          updateQuizMutation.isPending ||
          Object.keys(selectedQuizzes).length - 1 !== quizzes.length
        }
        onClick={() => {
          if (userId === "") {
            toast.error("user id not found");
            return;
          }

          updateQuizMutation.mutate(
            {
              sectionId,
              result: { [userId]: { ...selectedQuizzes, isChecked: true } },
            },
            {
              onSuccess: (updatedQuizResult) => {
                console.log({ updatedQuizResult });
                //   toast.success("Feedback has been successfully sent.");
                // setSelectedQuizzes((q) => ({ ...q, isChecked: true }));

                queryClient.invalidateQueries({
                  queryKey: ["sections", courseSlug],
                });
              },
              onError: (updatedQuizResultError) => {
                console.log({ updatedQuizResultError });
                // toast.error(updatedQuizResultError.message);
              },
            }
          );
        }}
        className="w-full flex items-center gap-2"
        size="lg"
      >
        {userQuizzesResult.isChecked ? (
          <>
            Checked <Check />
          </>
        ) : (
          "Check Answer"
        )}
        {updateQuizMutation.isPending && <Loader className="animate-spin" />}
      </Button>
    </div>
  );
};
