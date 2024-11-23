// "use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  createServerComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
// import { useSupabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";

interface CourseLayoutProps {
  children: React.ReactNode;
}

export default async function CourseLayout({ children }: CourseLayoutProps) {
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

  if (!user) {
    return redirect("/signin");
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b">
          <div className="max-w-6xl mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
            {/* <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <CourseSidebarNav config={courseConfig} />
          </ScrollArea>
        </aside> */}
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
