"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ChatSidebar } from "../chat-panel/_components/chat-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

export const LayoutHeader = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16 border-b border-border/30 overflow-x-hidden">
      <div className="flex items-center gap-2 px-4 grow">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {pathname === "/chat-panel" ? (
          <div className="flex items-center justify-between gap-6 grow pr-6">
            <Button className="h-8 w-8 p-1.5 " variant="secondary" size="icon">
              <Plus />
            </Button>
            <div className="">
              <ChatSidebar userId={userId} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-6 grow">
            <div></div>
            <div className="flex items-center gap-6">
              <Link className="hover:underline" href="/new">
                Skilld AI
              </Link>
              <ThemeToggle />

            </div>
          </div>
        )}
      </div>
    </header>
  );
};
