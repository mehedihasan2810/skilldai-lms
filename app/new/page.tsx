"use client";

import { ChatHeader } from "@/components/chat-header";
import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";
import ChatMobileSidebar from "@/components/side-navbar/chat-mobile-sidebar";
import { UserButton } from "@/components/user-button";
import { useSupabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewChatPage = () => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(null);

  // if (!session) {
  //   router.refresh();
  //   router.push("/signin");
  //   return null;
  // }

  useEffect(() => {
    // await supabase.auth.getSession()
    // if(window !== undefined){
    //   window.
    // }
    const checkSession = async () => {
      const newSession = await supabase.auth.getSession();
      console.log({ newSession: newSession.data.session });
      setSession(newSession.data.session);
      if (!newSession.data.session) {
        router.refresh();
        router.push("/signin");
      }
    };

    checkSession();
  }, [supabase, router]);

  if (!session) {
    return null;
  }

  return (
    <div className="relative isolate size-full">
      <ChatHeader />
      <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden">
        <SideNavBar userId={session.user.id} userEmail={session.user.email!} />
        {/* <ChatMobileSidebar /> */}
        <ChatPanel
          id={null}
          userEmail={session.user.email!}
          userId={session.user.id}
        />
      </div>
    </div>
  );
};

export default NewChatPage;
