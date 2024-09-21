"use client";

import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";
import ChatMobileSidebar from "@/components/side-navbar/chat-mobile-sidebar";
import { useSupabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props) => {
  const { session } = useSupabase();

  if (!session) redirect("/signin");

  return (
    <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden">
      <SideNavBar />
      <ChatMobileSidebar />

      <ChatPanel id={id} />
    </div>
  );
};

export default ChatPage;
