import Header from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NavItem } from "@/types/nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/tools-sidebar/tools-sidebar";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChatSidebar } from "./chat-panel/_components/chat-sidebar";
import { LayoutHeader } from "./_components/layout-header";
const navItems: NavItem[] = [
  {
    title: "AI Tools",
    href: "/tools",
    icon: "book",
  },
  {
    title: "Courses",
    href: "/courses",
    icon: "book",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "chartArea",
  },

  {
    title: "Course Generator",
    href: "/courses/create",
    icon: "graduationCap",
  },
  {
    title: "Quiz Generator2",
    href: "/quiz-from-doc",
    icon: "shieldQuestion",
  },
  // {
  //   title: "Quiz Generator",
  //   href: "/quiz-generator",
  //   icon: "shieldQuestion",
  // },
  {
    title: "Lesson Plan Generator",
    href: "/lesson-plan-generator",
    icon: "bookOpen",
  },
  {
    title: "Worksheet Generator",
    href: "/worksheet-generator",
    icon: "bookOpen",
  },
  {
    title: "PDF Chat",
    href: "/pdf-chat",
    icon: "bookOpen",
  },
  {
    title: "AI Skill Assessment",
    href: "/skill-assessment",
    icon: "bookOpen",
  },
  {
    title: "1 on 1 Tutoring",
    href: "/1on1tutoring",
    icon: "bookOpen",
  },
  
];

const teacherOnlyNavItems = ["/lesson-plan-generator", "/worksheet-generator"];

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;
  const userMetadata = session.user.user_metadata;

  console.log({ user });

  // if (user.user_metadata.permission !== "granted") {
  //   return redirect("/access");
  // }

  // const { error: userInfoError, data: userInfo } = await supabase
  //   .from("user_info")
  //   .select("id,profession")
  //   .eq("user_id", user.id)
  //   .single();

  // // console.log({ userInfo });

  // if (
  //   userInfoError?.message ===
  //   "JSON object requested, multiple (or no) rows returned"
  // ) {
  //   console.error(userInfoError);
  //   const { data: userCreatedData, error: userCreatedErr } = await supabase
  //     .from("user_info")
  //     .upsert(
  //       {
  //         user_id: user.id,
  //         institution: "",
  //         profession: "Student",
  //         class_name: "",
  //         section: "",
  //         subject: "",
  //       },
  //       { onConflict: "user_id" }
  //     )
  //     .select("id")
  //     .single();

  //   // console.log({ userCreatedData });
  //   // console.error({ userCreatedErr });

  //   // if (userCreatedData) {
  //   //   revalidatePath("/courses");
  //   // }
  // }

  const isRoleTeacher = userMetadata?.profession === "Teacher";

  const filteredNavItems = isRoleTeacher
    ? navItems
    : navItems.filter(
        (navItem) => !teacherOnlyNavItems.includes(navItem.href ?? "")
      );

  return (
    <SidebarProvider className="w-screen">
      <AppSidebar
        userProfession={userMetadata?.profession ?? ""}
        userEmail={user.email ?? ""}
        side="left"
      />
      <SidebarInset>
        <LayoutHeader userId={user.id} />
        <div className="flex flex-1 overflow-hidden w-full">
          {children}
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
      </SidebarInset>
      
      {/* <AppSidebar
        userProfession={userMetadata?.profession ?? ""}
        userEmail={user.email ?? ""}
        side="right"
      /> */}
    </SidebarProvider>

    // <div className="flex overflow-hidden">
    //   <DashboardSidebar navItems={filteredNavItems} />
    //   <main className="w-full flex-1 overflow-hidden">
    //     <Header email={user.email!} navItems={filteredNavItems} />
    //     {children}
    //   </main>
    // </div>
  );
};

export default Layout;
