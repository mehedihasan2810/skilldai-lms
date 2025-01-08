"use client";
import React, { useState } from "react";
import { buttonVariants } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { deleteWorksheet, getWorksheets, renameWorksheetTitle } from "@/lib/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { RenameTitleDialog } from "@/components/rename-title-dialog";
import { reportErrorAction } from "@/actions/report-error-via-mail";
import { toast } from "sonner";
import { DeleteToolItemDialog } from "@/components/tool-item-delete-dialog";
import { report } from "process";

export const WorksheetsList = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const [isTitleDialogOpen, setIsTitleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const {
    data: worksheets,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["worksheets"],
    queryFn: async () => await getWorksheets({ userId }),
  });

  const deleteLessonPlanMutation = useMutation({
    mutationFn: async ({ worksheetId }: { worksheetId: string }) =>
      await deleteWorksheet({ worksheetId }),
    onSuccess: async (deletedWorksheetRes) => {
      console.log({ deletedWorksheetRes });

      queryClient.invalidateQueries({ queryKey: ["worksheets"] });

      setIsDeleteDialogOpen(false);
      toast.success("Deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      reportErrorAction({
        userEmail: userId,
        errorMessage: error.message,
        errorTrace: `[WorksheetList] [deleteLessonPlanMutation] [onError] [app/%28tools-n-course%29/%28tools%29/worksheet-generator/_components/worksheets-list.tsx]`,
        errorSourceUrl: "/worksheet-generator",
      });
    },
  });
  const renameLessonPlanTitleMutation = useMutation({
    mutationFn: async ({
      worksheetId,
      title,
    }: {
      worksheetId: string;
      title: string;
    }) => await renameWorksheetTitle({ worksheetId, title }),
    onSuccess: async (editedTitleRes) => {
      console.log({ editedTitleRes });

      queryClient.invalidateQueries({ queryKey: ["worksheets"] });

      setIsTitleDialogOpen(false);

      toast.success("Renamed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      reportErrorAction({
        userEmail: userId,
        errorMessage: error.message,
        errorTrace: `[WorksheetList] [renameWorksheetTitleMutation] [onError] [app/%28tools-n-course%29/%28tools%29/worksheet-generator/_components/worksheets-list.tsx]`,
        errorSourceUrl: "/worksheet-generator",
      });
    },
  });

  const onRenameTitleSubmit = (title: string, worksheetId: string) => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    renameLessonPlanTitleMutation.mutate({
      worksheetId,
      title,
    });
  };

  return (
    <div className="mb-16 mt-16">
      <h2 className="text-xl font-semibold mb-2">
        Your recently generated worksheets{" "}
        <span className="text-base text-muted-foreground">
          ({worksheets?.length ?? 0})
        </span>
      </h2>

      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        // <div>Loading...</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border border-border/40 bg-card text-card-foreground p-4 rounded-md"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {worksheets?.length === 0 ? (
            <p className="text-muted-foreground">
              You haven&#39;t generated any worksheets yet!
            </p>
          ) : (
            worksheets?.map((worksheet) => (
              <div
                className="border dark:border-border/40 bg-card text-card-foreground p-4 rounded-md flex flex-col relative isolate group"
                key={worksheet.id}
              >
                <div className="grow">
                  <h3 className="text-lg font-semibold">{worksheet.title}</h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge>{worksheet.topic}</Badge>
                    {worksheet.grade_level && (
                      <Badge>{worksheet.grade_level}</Badge>
                    )}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground mt-4">
                  Created on {format(worksheet.created_at, "MMM d, yyyy")}
                </div>

                <Link
                  className={buttonVariants({ className: "w-full mt-4" })}
                  href={`/worksheet-generator/${worksheet?.id}`}
                >
                  View Worksheet
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
                        renameTitle={worksheet.title}
                        isPending={renameLessonPlanTitleMutation.isPending}
                        isTitleDialogOpen={isTitleDialogOpen}
                        setIsTitleDialogOpen={setIsTitleDialogOpen}
                        onSubmit={(title) =>
                          onRenameTitleSubmit(title, worksheet.id)
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
                            worksheetId: worksheet.id,
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
