"use client";
import Header from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import {
  createServerComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
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
    <div className="flex">
      <DashboardSidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
