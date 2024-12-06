// "use client";
import Header from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import {
  createServerComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
// import { useSupabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  // const { supabase } = useSupabase();
  // const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const newSession = await supabase.auth.getSession();
  //     console.log({ newSession: newSession.data.session });
  //     setSession(newSession.data.session);
  //     if (!newSession.data.session) {
  //       router.refresh();
  //       router.push("/");
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

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header email={user.email!} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
