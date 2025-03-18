import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";

export const ChatSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger
        className={buttonVariants({
          variant: "secondary",
          size: "icon",
          className: "h-8 w-8 p-1.5",
        })}
      >
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

