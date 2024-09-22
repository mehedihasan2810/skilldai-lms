"use client";

import { ChatHeader } from "@/components/chat-header";
import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";
import ChatMobileSidebar from "@/components/side-navbar/chat-mobile-sidebar";
import { UserButton } from "@/components/user-button";
import { useSupabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

const NewChatPage = () => {
  const { session } = useSupabase();

  if (!session) redirect("/signin");

  return (
    <div className="relative isolate size-full">
      <ChatHeader />
      <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden">
        <SideNavBar />
        {/* <ChatMobileSidebar /> */}
        <ChatPanel id={null} />
      </div>
    </div>
  );
};

export default NewChatPage;
