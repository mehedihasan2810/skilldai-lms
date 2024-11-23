"use client";
import React, { Fragment, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookOpen,
  Loader2Icon,
  MenuIcon,
  SidebarIcon,
  SquarePenIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton } from "../user-button";
import { useParams } from "next/navigation";
// import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/lib/db";
import { ChatItem } from "./chat-item";
import FeedbackForm from "../feedback-form";
import { cn } from "@/lib/utils";

const ChatMobileSidebar = ({email, userId}: {email: string, userId: string}) => {
  const [open, setOpen] = useState(false);

  const params = useParams();

  // const { supabase, session } = useSupabase();
  // const userId = session?.user.id;

  const {
    data: chats,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getChats(userId),
    enabled: !!userId,
  });

  return (
    <Sheet open={open} onOpenChange={(v) => setOpen(v)}>
      <SheetTrigger
        className={buttonVariants({ size: "icon", variant: "outline" })}
      >
        <MenuIcon className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <Link
          onClick={() => setOpen(false)}
          className="absolute right-8 top-8"
          href="/new"
        >
          <Button size="icon" variant="ghost">
            <SquarePenIcon className="w-4 h-4" />
          </Button>
        </Link>

        <div className="flex flex-col gap-4 justify-between px-2 mt-20 pb-24 h-full">
          <div className="flex flex-col flex-1 gap-2 overflow-hidden">
            <span className="font-medium">Chats</span>
            {chats && (
              <div className="flex flex-col flex-1 gap-2 overflow-auto">
                {chats.map((item, index) => (
                  <div key={index}>
                    <ChatItem
                      onClick={() => setOpen(false)}
                      id={item.id}
                      title={item.title}
                      selected={item.id === params.id}
                    />
                  </div>
                ))}
              </div>
            )}

            {isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
            {error && <p className="text-red-500">Could not fetch chats</p>}
          </div>

          <div className="flex items-center gap-4 mt-2">
            <Link
              title="Courses"
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: cn("flex gap-2 items-center"),
              })}
              href="/courses"
            >
              <BookOpen className="size-5" />{" "}
            </Link>
            <FeedbackForm  email={email} />
            <ThemeToggle />
            <UserButton userEmail={email} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatMobileSidebar;
