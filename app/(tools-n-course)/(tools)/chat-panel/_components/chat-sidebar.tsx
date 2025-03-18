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
import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/lib/db";
import { ChatItem } from "@/components/side-navbar/chat-item";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";

export const ChatSidebar = ({ userId }: { userId: string }) => {
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
      <SheetContent className="pt-20">
        <SheetHeader>
          <SheetTitle>Chats</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-1 gap-2 overflow-hidden">
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
      </SheetContent>
    </Sheet>
  );
};
