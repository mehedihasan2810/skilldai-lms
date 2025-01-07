"use client";

import React, { useState } from "react";
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
import { Loader, Trash } from "lucide-react";
import { buttonVariants } from "../ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChat } from "@/lib/db";
import { Chat } from "@/app/types";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { reportErrorAction } from "@/actions/report-error-via-mail";

const DeleteChatDialog = ({ chatId }: { chatId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const deleteChatMutation = useMutation({
    mutationFn: async ({ chatId }: { chatId: string }) =>
      await deleteChat(chatId),
    onSuccess: async (deletedChat) => {
      console.log({ deletedChat });

      queryClient.invalidateQueries({ queryKey: ["chats"] });

      // queryClient.setQueryData<Chat[]>(["chats"], (oldChats) => {
      //   return (oldChats ?? []).filter(
      //     (chat) => chat.id !== deletedChat.chatData.id
      //   );
      //   // return [...(oldChats || []), newChat];
      // });

      toast.success("Deleted successfully");

      setIsDialogOpen(false);

      router.push("/new");
    },
    onError: (error) => {
      toast.error(error.message);
      reportErrorAction({
        userEmail: "Unknown",
        errorMessage: error.message,
        errorTrace: `[DeleteChatDialog] [deleteChatMutation] [onError] [app/%28tools-n-course%29/%28tools%29/pdf-chat/%5Bid%5D/_components/delete-chat-dialog.tsx]`,
        errorSourceUrl: "/pdf-chat/[id]",
      });
    },
  });

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={(v) => setIsDialogOpen(v)}>
      <AlertDialogTrigger
        className={buttonVariants({
          className:
            "md:invisible md:group-hover:visible w-fit h-fit px-2 py-1 text-rose-500 hover:text-rose-300",
          variant: "ghost",
          size: "icon",
        })}
      >
        <Trash className="size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteChatMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteChatMutation.isPending}
            className={buttonVariants({
              variant: "destructive",
              className: "flex gap-2 items-center",
            })}
            onClick={() => deleteChatMutation.mutate({ chatId })}
          >
            {deleteChatMutation.isPending && (
              <Loader className="size-5 animate-spin" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteChatDialog;
