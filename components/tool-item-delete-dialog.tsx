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
import { buttonVariants } from "./ui";

interface Props {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (value: boolean) => void;
  onDelete: () => void;
  isPending: boolean;
}

export const DeleteToolItemDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDelete,
  isPending,
}: Props) => {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogTrigger
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive-foreground w-full px-2 py-2 rounded-md text-red-500"
      >
        <Trash className="size-4" /> Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={buttonVariants({
              variant: "destructive",
              className: "flex gap-2 items-center",
            })}
            onClick={onDelete}
          >
            {isPending && <Loader className="size-5 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
