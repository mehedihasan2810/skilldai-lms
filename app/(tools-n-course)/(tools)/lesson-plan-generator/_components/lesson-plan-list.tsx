"use client";
import { buttonVariants } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import {
  deleteLessonPlan,
  renameLessonPlanTitle,
  getLessonPlans,
} from "@/lib/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Ellipsis,
} from "lucide-react";

import { toast } from "sonner";
import { format } from "date-fns"; // Add this import at the top
import { reportErrorAction } from "@/actions/report-error-via-mail";
import { RenameTitleDialog } from "@/components/rename-title-dialog";
import { DeleteToolItemDialog } from "@/components/tool-item-delete-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export const LessonPlanList = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const [isTitleDialogOpen, setIsTitleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    data: lessonPlans,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["lessonPlans"],
    queryFn: async () => await getLessonPlans({ userId }),
  });

  console.log({ lessonPlans });

  const deleteLessonPlanMutation = useMutation({
    mutationFn: async ({ lessonPlanId }: { lessonPlanId: string }) =>
      await deleteLessonPlan({ lessonPlanId }),
    onSuccess: async (deletedLessonPlanRes) => {
      console.log({ deletedLessonPlanRes });

      queryClient.invalidateQueries({ queryKey: ["lessonPlans"] });

      setIsDeleteDialogOpen(false);
      toast.success("Deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      reportErrorAction({
        userEmail: "Unknown",
        errorMessage: error.message,
        errorTrace: `[LessonPlanList] [deleteLessonPlanMutation] [onError] [app/%28tools-n-course%29/%28tools%29/lesson-plan-generator/_components/lesson-plan-list.tsx]`,
        errorSourceUrl: "/lesson-plan-generator",
      });
    },
  });
  const renameLessonPlanTitleMutation = useMutation({
    mutationFn: async ({
      lessonPlanId,
      title,
    }: {
      lessonPlanId: string;
      title: string;
    }) => await renameLessonPlanTitle({ lessonPlanId, title }),
    onSuccess: async (editedTitleRes) => {
      console.log({ editedTitleRes });

      queryClient.invalidateQueries({ queryKey: ["lessonPlans"] });

      setIsTitleDialogOpen(false);

      toast.success("Renamed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      reportErrorAction({
        userEmail: "Unknown",
        errorMessage: error.message,
        errorTrace: `[LessonPlanList] [editLessonPlanTitleMutation] [onError] [app/%28tools-n-course%29/%28tools%29/lesson-plan-generator/_components/lesson-plan-list.tsx]`,
        errorSourceUrl: "/lesson-plan-generator",
      });
    },
  });

  const onRenameTitleSubmit = (title: string, lessonPlanId: string) => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    renameLessonPlanTitleMutation.mutate({
      lessonPlanId,
      title,
    });
  };

  return (
    <div className="mb-16 mt-16">
      <h2 className="text-xl font-semibold mb-2">
        Your recently generated lesson plans <span className="text-base text-muted-foreground">({lessonPlans?.length ?? 0})</span>
      </h2>

      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border dark:border-border/40 bg-card text-card-foreground p-4 rounded-md"
            >
              <Skeleton className="w-full h-5 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="w-24 h-5 rounded-full" />
                <Skeleton className="w-24 h-5 rounded-full" />
              </div>
              <Skeleton className="w-44 h-4 mt-4" />
              <Skeleton className="w-full h-10 mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lessonPlans?.length === 0 ? (
            <p className="text-muted-foreground">
              You haven&#39;t generated any lesson plans yet!
            </p>
          ) : (
            lessonPlans?.map((lessonPlan) => (
              <div
                className="border dark:border-border/40 bg-card text-card-foreground p-4 rounded-md flex flex-col relative group"
                key={lessonPlan.id}
              >
                <div className="grow">
                  <h3 className="text-lg font-semibold">{lessonPlan.title}</h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge>{lessonPlan.topic}</Badge>
                    {lessonPlan.grade_level && (
                      <Badge>{lessonPlan.grade_level}</Badge>
                    )}
                    {lessonPlan.duration && (
                      <Badge>{lessonPlan.duration}</Badge>
                    )}
                    {lessonPlan.style && <Badge>{lessonPlan.style}</Badge>}
                    {lessonPlan.focusing_on && (
                      <Badge>{lessonPlan.focusing_on}</Badge>
                    )}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground mt-4">
                  Created on {format(lessonPlan.created_at, "MMM d, yyyy")}
                </div>

                <Link
                  className={buttonVariants({ className: "w-full mt-4" })}
                  href={`/lesson-plan-generator/${lessonPlan?.id}`}
                >
                  View Lesson Plan
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={buttonVariants({
                      className:
                        "absolute top-0 right-0 mt-2 mr-2 lg:opacity-0 lg:group-hover:opacity-100 backdrop-blur-sm",
                      variant: "ghost",
                      size: "icon",
                    })}
                  >
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="p-0">
                      <RenameTitleDialog
                        renameTitle={lessonPlan.title}
                        isPending={renameLessonPlanTitleMutation.isPending}
                        isTitleDialogOpen={isTitleDialogOpen}
                        setIsTitleDialogOpen={setIsTitleDialogOpen}
                        onSubmit={(title) =>
                          onRenameTitleSubmit(title, lessonPlan.id)
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
                          deleteLessonPlanMutation.mutate({
                            lessonPlanId: lessonPlan.id,
                          });
                        }}
                        isPending={deleteLessonPlanMutation.isPending}
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
