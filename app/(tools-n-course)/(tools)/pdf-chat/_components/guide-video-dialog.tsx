"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocalStorage } from "usehooks-ts";

export const GuideVideoDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogSeen, setIsDialogSeen] = useLocalStorage<boolean>(
    "isSkilldPDFChatDialogSeen",
    false
  );

  useEffect(() => {
    if (!isDialogSeen) {
      setIsDialogOpen(true);
    }
  }, [isDialogSeen]);

  const handleClose = () => {
    setIsDialogSeen(true); // Mark the dialog as seen
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(v) => {
        if (!v) {
          handleClose();
        }
        setIsDialogOpen(v);
      }}
    >
      <DialogTrigger className="hidden"></DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Welcome to PDF chat tool 🥳</DialogTitle>
        </DialogHeader>
        <iframe
          className="aspect-video w-full rounded-xl"
          src="https://www.youtube.com/embed/kY6Kas7bP6k?si=KLEcIy2ClMcxAjHQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};
