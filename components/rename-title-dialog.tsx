"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader, Pencil } from "lucide-react";
import { Input } from "./ui";
import { Label } from "recharts";

interface Props {
  renameTitle: string;
  isTitleDialogOpen: boolean;
  setIsTitleDialogOpen: (value: boolean) => void;
  onSubmit: (title: string) => void;
  isPending: boolean;
}

export const RenameTitleDialog = ({
  renameTitle,
  isTitleDialogOpen,
  setIsTitleDialogOpen,
  onSubmit,
  isPending,
}: Props) => {
  const [title, setTitle] = useState(renameTitle);
  return (
    <AlertDialog
      open={isTitleDialogOpen}
      onOpenChange={(v) => setIsTitleDialogOpen(v)}
    >
      <AlertDialogTrigger
        className="w-full text-left flex items-center gap-2 hover:bg-muted rounded-md px-2 py-2 text-muted-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <Pencil className="size-4" /> Rename title
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rename Title</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <Label className="sr-only">Title</Label>
          <Input
            defaultValue={renameTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Rename title..."
          />
        </div>

        <AlertDialogFooter className="flex items-center justify-end gap-2">
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="flex items-center gap-2"
            onClick={() => {
              onSubmit(title);
            }}
          >
            {isPending && <Loader className="size-5 animate-spin" />}
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
