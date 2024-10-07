import Header from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
