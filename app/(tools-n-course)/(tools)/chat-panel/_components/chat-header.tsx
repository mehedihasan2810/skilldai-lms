import { SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { ChatSidebar } from "./chat-sidebar";

export const ChatHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16 border-b border-border/30 overflow-x-hidden">
      <div className="flex items-center gap-2 px-4 grow">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center justify-between gap-6 grow">
          <div></div>
          <div className="flex items-center gap-6">
          </div>
        </div>
      </div>
    </header>
  );
};
