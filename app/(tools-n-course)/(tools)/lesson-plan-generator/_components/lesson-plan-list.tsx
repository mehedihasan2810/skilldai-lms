"use client";
import { Button, buttonVariants, Input } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import {
  deleteLessonPlan,
  editLessonPlanTitle,
  getLessonPlans,
} from "@/lib/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Ellipsis, Loader, Trash, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { format } from "date-fns"; // Add this import at the top
import { reportErrorAction } from "@/actions/report-error-via-mail";

export const LessonPlanList = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [title, setTitle] = useState("");

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

      setIsDialogOpen(false);
      toast.success("Lesson plan deleted successfully");
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
  const editLessonPlanTitleMutation = useMutation({
    mutationFn: async ({
      lessonPlanId,
      title,
    }: {
      lessonPlanId: string;
      title: string;
    }) => await editLessonPlanTitle({ lessonPlanId, title }),
    onSuccess: async (editedTitleRes) => {
      console.log({ editedTitleRes });

      setTitle("");

      queryClient.invalidateQueries({ queryKey: ["lessonPlans"] });

      toast.success("Lesson plan title edited successfully");
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

  return (
    <div className="mb-16 mt-16">
      <h2 className="text-xl font-semibold mb-2">
        Your recently generated lesson plans
      </h2>

      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lessonPlans?.length === 0 ? (
            <p className="text-muted-foreground">
              You haven&#39;t generated any lesson plans yet!
            </p>
          ) : (
            lessonPlans?.map((lessonPlan) => (
              <div
                className="border bg-card text-card-foreground p-4 rounded-md flex flex-col relative group"
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
                        "absolute top-0 right-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 backdrop-blur-sm border",
                      variant: "ghost",
                      size: "icon",
                    })}
                  >
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="hover:bg-muted rounded-md">
                      <AlertDialog
                        open={isEditDialogOpen}
                        onOpenChange={(v) => setIsEditDialogOpen(v)}
                      >
                        <AlertDialogTrigger
                          className="w-full text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Edit title
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Edit Title</AlertDialogTitle>
                          </AlertDialogHeader>
                          <Input
                            defaultValue={lessonPlan.title}
                            value={title || lessonPlan.title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Enter title"
                          />
                          <AlertDialogFooter className="grid grid-cols-2 gap-2">
                            <AlertDialogCancel
                              disabled={editLessonPlanTitleMutation.isPending}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              disabled={editLessonPlanTitleMutation.isPending}
                              className="flex items-center gap-2"
                              onClick={() => {
                                if (!title)
                                  return toast.error("Title cannot be empty");
                                editLessonPlanTitleMutation.mutate({
                                  lessonPlanId: lessonPlan.id,
                                  title,
                                });
                              }}
                            >
                              {editLessonPlanTitleMutation.isPending && (
                                <Loader className="size-5 animate-spin" />
                              )}
                              Save
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuLabel className="p-0">
                      {" "}
                      <AlertDialog
                        open={isDialogOpen}
                        onOpenChange={(v) => setIsDialogOpen(v)}
                      >
                        <AlertDialogTrigger
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive-foreground w-full px-2 py-2 rounded-md text-red-500"
                        >
                          <Trash className="size-4" /> Delete
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              disabled={deleteLessonPlanMutation.isPending}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              disabled={deleteLessonPlanMutation.isPending}
                              className={buttonVariants({
                                variant: "destructive",
                                className: "flex gap-2 items-center",
                              })}
                              onClick={() =>
                                deleteLessonPlanMutation.mutate({
                                  lessonPlanId: lessonPlan.id,
                                })
                              }
                            >
                              {deleteLessonPlanMutation.isPending && (
                                <Loader className="size-5 animate-spin" />
                              )}
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
