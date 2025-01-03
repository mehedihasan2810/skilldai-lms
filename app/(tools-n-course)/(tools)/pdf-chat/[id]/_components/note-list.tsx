import React, { useState } from "react";
import Markdown from "@/components/markdown/markdown";
import { Button, buttonVariants } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { deletePDFChatNote, getPDFChatNotes } from "@/lib/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, Trash } from "lucide-react";
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

export const NoteList = ({ pdfChatId }: { pdfChatId: string }) => {
  const {
    data: notes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pdfChatNotes", pdfChatId],
    queryFn: async () => await getPDFChatNotes({ pdfChatId }),
  });

  console.log({ notes });

  if (error) {
    return <p className="mt-10 text-red-500">{error.message}</p>;
  }

  if (isLoading) {
    return (
      <div className="mt-10 ">
        <h4 className="mb-2 font-bold text-lg">Your Notes</h4>
        <div className="bg-card p-4 rounded-xl border border-border/40">
          <Skeleton className="h-5 w-full mb-4" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-full mb-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h4 className="mb-2 font-bold text-lg">Your Notes</h4>

      {(notes ?? []).length === 0 ? (
        <p>You haven&#39;t created any note.</p>
      ) : (
        (notes ?? []).map((note) => (
          <div
            key={note.id}
            className="mb-4 p-4 rounded-xl bg-card border border-border/40"
          >
            <div className="mb-4 flex justify-between gap-2 items-start">
              <h5 className=" text-xl font-bold">{note.title}</h5>
              <div>
                <DeleteNoteDialog noteId={note.id} pdfChatId={pdfChatId} />
              </div>
            </div>
            <div className="text-muted-foreground">
              <Markdown text={note.note} className="" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const DeleteNoteDialog = ({
  noteId,
  pdfChatId,
}: {
  noteId: string;
  pdfChatId: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const deleteNoteMutation = useMutation({
    mutationFn: async ({ noteId }: { noteId: string }) =>
      await deletePDFChatNote({
        noteId,
      }),
    onSuccess: async (updatedLessonPlanData) => {
      console.log({ updatedLessonPlanData });
      await queryClient.invalidateQueries({
        queryKey: ["pdfChatNotes", pdfChatId],
      });
      toast.success("Deleted successfully.");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message);
    },
  });

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={(v) => setIsDialogOpen(v)}>
      <AlertDialogTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "h-9 w-9 text-red-500 hover:text-red-600",
        })}
      >
        {" "}
        <Trash className="size-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteNoteMutation.isPending}
            onClick={() => {
              deleteNoteMutation.mutate({ noteId });
            }}
            className="flex items-center gap-2"
          >
            {deleteNoteMutation.isPending && (
              <Loader className="size-5 animate-spin" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
