// "use client";

import { ChatHeader } from "@/components/chat-header";
import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";
import ChatMobileSidebar from "@/components/side-navbar/chat-mobile-sidebar";
import { UserButton } from "@/components/user-button";
// import { useSupabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";
import { Session } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewChatPage = async () => {
  // const router = useRouter();
  // const { supabase } = useSupabase();
  // const [session, setSession] = useState<Session | null>(null);

  // // if (!session) {
  // //   router.refresh();
  // //   router.push("/signin");
  // //   return null;
  // // }

  // useEffect(() => {
  //   // await supabase.auth.getSession()
  //   // if(window !== undefined){
  //   //   window.
  //   // }
  //   const checkSession = async () => {
  //     const newSession = await supabase.auth.getSession();
  //     console.log({ newSession: newSession.data.session });
  //     setSession(newSession.data.session);
  //     if (!newSession.data.session) {
  //       router.refresh();
  //       router.push("/signin");
  //     }
  //   };

  //   checkSession();
  // }, [supabase, router]);

  // if (!session) {
  //   return null;
  // }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    return redirect("/signin")
  }

  console.log({user})

  return (
    <div className="relative isolate size-full">
      <ChatHeader userId={user.id} email={user.email!} />
      <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden">
        <SideNavBar userId={user.id} userEmail={user.email!} />
        {/* <ChatMobileSidebar /> */}
        <ChatPanel
          id={null}
          userEmail={user.email!}
          userId={user.id}
        />
      </div>
    </div>
  );
};

export default NewChatPage;
