// "use client";

import { ChatHeader } from "@/components/chat-header";
import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";
import ChatMobileSidebar from "@/components/side-navbar/chat-mobile-sidebar";
// import { useSupabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = async ({ params: { id } }: Props) => {
  // const { session } = useSupabase();

  // if (!session) redirect("/signin");

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  return (
    <div className="relative isolate size-full">
      <ChatHeader userId={user.id} email={user.email!} />
      <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden">
        <SideNavBar userId={user.id} userEmail={user.email!} />
        {/* <ChatMobileSidebar /> */}
        <ChatPanel id={id} userEmail={user.email!} userId={user.id} />
      </div>
    </div>
  );
};

export default ChatPage;
