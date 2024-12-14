"use client";

import { ChatItem } from "@/components/side-navbar/chat-item";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { getChats } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Loader2Icon,
  SidebarIcon,
  SquarePenIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import Image from "next/image";
import FeedbackForm from "../feedback-form";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui";

export const SideNavBar = ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const [open, setOpen] = useState(false);

  const params = useParams();

  const {
    data: chats,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getChats(userId),
    enabled: !!userId,
  });

  if (open) {
    return (
      <div
        className="flex h-screen max-h-screen overflow-hidden 
       flex-col gap-4 justify-between px-2 py-2 pb-4 w-[250px] border-r bg-card"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Image
              src="/skilld-logo.png"
              alt="Skilld AI logo"
              width={20}
              height={20}
            />
            <Link href="/new" className="text-lg font-semibold text-center">
              Skilld AI
            </Link>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Button onClick={() => setOpen(false)} size="icon" variant="ghost">
              <SidebarIcon className="w-4 h-4" />
            </Button>

            <Link href="/new">
              <Button size="icon" variant="ghost">
                <SquarePenIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2 overflow-hidden">
          <span className="font-medium">Chats</span>
          {chats && (
            <div className="flex flex-col flex-1 gap-2 overflow-auto">
              {chats.map((item, index) => (
                <ChatItem
                  key={index}
                  id={item.id}
                  title={item.title}
                  selected={item.id === params.id}
                />
              ))}
            </div>
          )}

          {isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
          {error && <p className="text-red-500">Could not fetch chats</p>}
        </div>

        <div className=" mt-2">
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: cn("flex gap-2 items-center w-full mb-1"),
            })}
            href="/tools"
          >
            <BookOpen className="size-5" />AI Tools
          </Link>
          <FeedbackForm expanded email={userEmail} />
          <div className="flex gap-4 items-center justify-center w-full mt-4 mb-4">
            <ThemeToggle />
            <UserButton expanded userEmail={userEmail} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex h-screen max-h-screen flex-col gap-2 justify-between px-2 py-2 pb-4 items-center border-r bg-card">
      <div className="flex flex-col gap-2">
        <Link href="/new" className="text-lg font-semibold text-center">
          Skilld
        </Link>

        <div className="flex items-center gap-2">
          <Button onClick={() => setOpen(true)} size="icon" variant="ghost">
            <SidebarIcon className="w-4 h-4" />
          </Button>

          <Link href="/new">
            <Button size="icon" variant="ghost">
              <SquarePenIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Link
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: cn("flex gap-2 items-center"),
              })}
              href="/tools"
            >
              <BookOpen className="size-5" />{" "}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>AI Tools</p>
          </TooltipContent>
        </Tooltip>

        <FeedbackForm email={userEmail} />
        <ThemeToggle />
        <UserButton userEmail={userEmail} />
      </div>
    </div>
  );
};
