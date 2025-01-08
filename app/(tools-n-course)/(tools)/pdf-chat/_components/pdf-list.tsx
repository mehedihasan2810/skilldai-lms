"use client";
import { reportErrorAction } from "@/actions/report-error-via-mail";
import { buttonVariants } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { deletePDFChat, getAllPDFInfo, renamePDFChatTitle } from "@/lib/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowRight, Ellipsis, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenameTitleDialog } from "@/components/rename-title-dialog";
import { DeleteToolItemDialog } from "@/components/tool-item-delete-dialog";

export const RecentPDFList = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const [isTitleDialogOpen, setIsTitleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    data: pdfs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pdfChatList", userId],
    queryFn: async () => await getAllPDFInfo({ userId }),
  });

  console.log({ pdfs });

  const deleteQuizMutation = useMutation({
    mutationFn: async ({ pdfChatId }: { pdfChatId: string }) =>
      await deletePDFChat({ id: pdfChatId }),
    onSuccess: async (deletedPdfChatRes) => {
      console.log({ deletedPdfChatRes });

      queryClient.invalidateQueries({ queryKey: ["pdfChatList", userId] });

      setIsDeleteDialogOpen(false);
      toast.success("Deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      reportErrorAction({
        userEmail: userId,
        errorMessage: error.message,
        errorTrace: `[PdfChatList] [deleteQuizMutation] [onError] [\app\(tools-n-course)\(tools)\pdf-chat\_components\pdf-list.tsx]`,
        errorSourceUrl: "/pdf-chat",
      });
    },
  });
  const renamePdfChatMutation = useMutation({
    mutationFn: async ({
      pdfChatId,
      title,
    }: {
      pdfChatId: string;
      title: string;
    }) => await renamePDFChatTitle({ id: pdfChatId, title }),
    onSuccess: async (editedTitleRes) => {
      console.log({ editedTitleRes });

      queryClient.invalidateQueries({ queryKey: ["pdfChatList", userId] });

      setIsTitleDialogOpen(false);

      toast.success("Renamed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      reportErrorAction({
        userEmail: userId,
        errorMessage: error.message,
        errorTrace: `[PdfChatList] [renamePdfChatMutation] [onError] [\app\(tools-n-course)\(tools)\pdf-chat\_components\pdf-list.tsx]`,
        errorSourceUrl: "/pdf-chat",
      });
    },
  });

  const onRenameTitleSubmit = (title: string, pdfChatId: string) => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    renamePdfChatMutation.mutate({
      pdfChatId,
      title,
    });
  };

  return (
    <div className="mt-16 mb-24">
      <h2 className="text-xl font-semibold mb-3">Recents <span className="text-base text-muted-foreground">
          ({pdfs?.length ?? 0})
        </span></h2>

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
          {pdfs?.length === 0 ? (
            <div className="text-muted-foreground">No data found!</div>
          ) : (
            pdfs?.map((pdfData) => (
              <div
                key={pdfData.id}
                className="border p-4 rounded-md bg-card text-card-foreground space-y-3 flex flex-col justify-between relative isolate group"
              >
                <div className="space-y-2">
                  <Image
                    className="w-full rounded-md aspect-video"
                    src="/pdf.png"
                    alt="Pdf image"
                    width={300}
                    height={200}
                  />
                  <h4 className=" font-medium">{pdfData.title}</h4>

                  <div className="text-sm text-muted-foreground">
                    Created on {format(pdfData.created_at, "MMM d, yyyy")}
                  </div>
                </div>
                <Link
                  href={`/pdf-chat/${pdfData.id}`}
                  className={buttonVariants({
                    className: "w-full flex items-center gap-2",
                  })}
                >
                  Chat <ArrowRight className="size-5" />
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={buttonVariants({
                      className:
                        "absolute top-0 right-0 mt-2 mr-2 lg:opacity-0 lg:group-hover:opacity-100 backdrop-blur-md text-gray-800",
                      variant: "ghost",
                      size: "icon",
                    })}
                  >
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="p-0">
                      <RenameTitleDialog
                        renameTitle={pdfData.title}
                        isPending={renamePdfChatMutation.isPending}
                        isTitleDialogOpen={isTitleDialogOpen}
                        setIsTitleDialogOpen={setIsTitleDialogOpen}
                        onSubmit={(title) =>
                          onRenameTitleSubmit(title, pdfData.id)
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
                            pdfChatId: pdfData.id,
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
