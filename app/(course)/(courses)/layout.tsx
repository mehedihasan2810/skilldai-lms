import Header from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NavItem } from "@/types/nav";

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
    title: "Quiz Generator",
    href: "/quiz-from-doc",
    icon: "shieldQuestion",
  },
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
    title: "AI Summariser",
    href: "/ai-summariser",
    icon: "bookOpen",
  },
];

const teacherOnlyNavItems = ["/lesson-plan-generator", "/worksheet-generator"];

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const { error: userInfoError, data: userInfo } = await supabase
    .from("user_info")
    .select("id,profession")
    .eq("user_id", user.id)
    .single();

  console.log({ userInfo });

  if (
    userInfoError?.message ===
    "JSON object requested, multiple (or no) rows returned"
  ) {
    console.error(userInfoError);
    const { data: userCreatedData, error: userCreatedErr } = await supabase
      .from("user_info")
      .upsert(
        {
          user_id: user.id,
          institution: "",
          profession: "Student",
          class_name: "",
          section: "",
          subject: "",
        },
        { onConflict: "user_id" }
      )
      .select("id")
      .single();

    console.log({ userCreatedData });
    console.error({ userCreatedErr });

    // if (userCreatedData) {
    //   revalidatePath("/courses");
    // }
  }

  const isRoleTeacher = userInfo?.profession === "Teacher";

  const filteredNavItems = isRoleTeacher
    ? navItems
    : navItems.filter(
        (navItem) => !teacherOnlyNavItems.includes(navItem.href ?? "")
      );

  return (
    <div className="flex">
      <DashboardSidebar navItems={filteredNavItems} />
      <main className="w-full flex-1 overflow-hidden">
        <Header email={user.email!} navItems={filteredNavItems} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
