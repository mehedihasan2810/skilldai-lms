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
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16 border-b border-border/30 overflow-x-hidden">
          <div className="flex items-center gap-2 px-4 grow">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center justify-between gap-6 grow">
              <div></div>
              <div className="flex items-center gap-6">
                <Link className="hover:underline" href="/new">
                  Skilld AI
                </Link>
                <ThemeToggle />
              </div>
            </div>
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
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
