"use client";
import { Button, buttonVariants } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteQFDQuiz, getQFDQuizzes, renameQFDQuizTitle } from "@/lib/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Ellipsis, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenameTitleDialog } from "@/components/rename-title-dialog";
import { DeleteToolItemDialog } from "@/components/tool-item-delete-dialog";
import { toast } from "sonner";
import { reportErrorAction } from "@/actions/report-error-via-mail";

export const RecentQuizList = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const [isTitleDialogOpen, setIsTitleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const {
    data: quizzes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["qfdQuiz", userId],
    queryFn: async () => await getQFDQuizzes({ userId }),
  });

  // console.log({ quizzes });

  const deleteQuizMutation = useMutation({
    mutationFn: async ({ quizId }: { quizId: string }) =>
      await deleteQFDQuiz({ quizId }),
    onSuccess: async (deletedQuizRes) => {
      console.log({ deletedQuizRes });

      queryClient.invalidateQueries({ queryKey: ["qfdQuiz", userId] });

      setIsDeleteDialogOpen(false);
      toast.success("Deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      reportErrorAction({
        userEmail: userId,
        errorMessage: error.message,
        errorTrace: `[RecentQuizList] [deleteQuizMutation] [onError] [app/%28tools-n-course%29/%28tools%29/quiz-from-doc/_components/recent-quiz-list.tsx]`,
        errorSourceUrl: "/quiz-from-doc",
      });
    },
  });
  const renameLessonPlanTitleMutation = useMutation({
    mutationFn: async ({ quizId, title }: { quizId: string; title: string }) =>
      await renameQFDQuizTitle({ quizId, title }),
    onSuccess: async (editedTitleRes) => {
      console.log({ editedTitleRes });

      queryClient.invalidateQueries({ queryKey: ["qfdQuiz", userId] });

      setIsTitleDialogOpen(false);

      toast.success("Renamed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      reportErrorAction({
        userEmail: userId,
        errorMessage: error.message,
        errorTrace: `[RecentQuizList] [renameLessonPlanTitleMutation] [onError] [app/%28tools-n-course%29/%28tools%29/quiz-from-doc/_components/recent-quiz-list.tsx]`,
        errorSourceUrl: "/quiz-from-doc",
      });
    },
  });

  const onRenameTitleSubmit = (title: string, quizId: string) => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    renameLessonPlanTitleMutation.mutate({
      quizId,
      title,
    });
  };

  return (
    <div className="mt-16 mb-24">
      <h2 className="text-xl font-semibold mb-3">
        Recently generated quizzes{" "}
        <span className="text-base text-muted-foreground">
          ({quizzes?.length ?? 0})
        </span>
      </h2>

      {error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="space-y-2 bg-card p-4 rounded-md border dark:border-border/40"
            >
              <Skeleton className="w-full h-36 aspect-video" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {quizzes?.length === 0 ? (
            <div className="text-muted-foreground">
              You haven&#39;t generated any quizzes yet!
            </div>
          ) : (
            quizzes?.map((quiz) => (
              <div
                key={quiz.id}
                className="border dark:border-border/40 p-4 rounded-md bg-card text-card-foreground flex flex-col gap-2 relative isolate group"
              >
                <div className="grow space-y-2">
                  {/* <Image
                    className="w-full rounded-md aspect-video"
                    src="/pdf.png"
                    alt="Pdf image"
                    width={300}
                    height={200}
                  /> */}
                  <h3 className="text-lg font-semibold">{quiz.title}</h3>
                  <div className="text-sm text-muted-foreground mt-4">
                    Created on {format(quiz.created_at, "MMM d, yyyy")}
                  </div>
                </div>
                <Link
                  href={`/quiz-from-doc/${quiz.id}`}
                  className={buttonVariants({ className: "w-full" })}
                >
                  Take Quiz
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={buttonVariants({
                      className:
                        "absolute top-0 right-0 mt-2 mr-2 lg:opacity-0 lg:group-hover:opacity-100 backdrop-blur-md",
                      variant: "ghost",
                      size: "icon",
                    })}
                  >
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="p-0">
                      <RenameTitleDialog
                        renameTitle={quiz.title}
                        isPending={renameLessonPlanTitleMutation.isPending}
                        isTitleDialogOpen={isTitleDialogOpen}
                        setIsTitleDialogOpen={setIsTitleDialogOpen}
                        onSubmit={(title) =>
                          onRenameTitleSubmit(title, quiz.id)
                        }
                      />
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuLabel className="p-0">
                      {" "}
                      <DeleteToolItemDialog
                        isDeleteDialogOpen={isDeleteDialogOpen}
                        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                        onDelete={() => {
                          deleteQuizMutation.mutate({
                            quizId: quiz.id,
                          });
                        }}
                        isPending={deleteQuizMutation.isPending}
                      />
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
