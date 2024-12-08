import Header from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const Layout = async ({ children }: { children: React.ReactNode }) => {
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
