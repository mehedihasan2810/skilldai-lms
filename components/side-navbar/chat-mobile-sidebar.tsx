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
  Loader2Icon,
  MenuIcon,
  SidebarIcon,
  SquarePenIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton } from "../user-button";
import { useParams } from "next/navigation";
import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/lib/db";
import { ChatItem } from "./chat-item";

const ChatMobileSidebar = () => {
  const [open, setOpen] = useState(false);

  const params = useParams();

  const { supabase, session } = useSupabase();
  const userId = session?.user.id;

  const {
    data: chats,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getChats(supabase, userId),
    enabled: !!userId,
  });

  return (
    <Sheet open={open} onOpenChange={(v) => setOpen(v)}>
      <SheetTrigger className="absolute z-50 top-4 left-4 sm:hidden">
        <MenuIcon className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        {/* <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Image
              src="/skilld-logo.png"
              alt="Skilld ai logo"
              width={30}
              height={30}
            />{" "}
            Skilld AI
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-8">
          <Link href="/signin">
            <Button variant="secondary">Sign In</Button>
          </Link>
          <ThemeToggle />
        </div> */}

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
          {/* <div className="flex justify-between gap-2">
            <div className="flex gap-2 items-center">
            
            </div>

            <div className="flex items-center justify-between gap-2">
            <Link href="/new">
                <Button size="icon" variant="ghost">
                  <SquarePenIcon className="w-4 h-4" />
                </Button>
              </Link> */}
          {/* <Button
                onClick={() => setOpen(false)}
                size="icon"
                variant="ghost"
              >
                <SidebarIcon className="w-4 h-4" />
              </Button>

              <Link href="/new">
                <Button size="icon" variant="ghost">
                  <SquarePenIcon className="w-4 h-4" />
                </Button>
              </Link> */}
          {/* </div>
          </div> */}

          <div className="flex flex-col flex-1 gap-2 overflow-hidden">
            <span className="font-medium">Chats</span>
            {chats && (
              <div className="flex flex-col flex-1 gap-2 overflow-auto">
                {chats.map((item, index) => (
                  <div onClick={() => setOpen(false)} key={index}>
                    <ChatItem
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

          <div className="flex items-center justify-between gap-4 mt-2">
            {/* <a
            href="https://github.com/13point5/open-artifacts"
            target="_blank"
            className="text-black flex items-center gap-4 px-1"
          >
            <Image src="/github.svg" height="24" width="24" alt="github logo" />
            <span className="text-sm font-medium">GitHub Repo</span>
          </a>
          <UserSettings showLabel /> */}
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatMobileSidebar;
