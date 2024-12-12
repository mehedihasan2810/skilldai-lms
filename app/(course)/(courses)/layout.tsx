import Header from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NavItem } from "@/types/nav";

const navItems: NavItem[] = [
  {
    title: "Courses",
    href: "/courses",
    icon: "book",
    label: "Courses",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "chartArea",
    label: "Reports",
  },

  {
    title: "Course Generator",
    href: "/courses/create",
    icon: "graduationCap",
    label: "Course Generator",
  },
  {
    title: "Quiz Generator",
    href: "/quiz-from-doc",
    icon: "shieldQuestion",
    label: "Quiz Generator",
  },
  {
    title: "Lesson Plan Generator",
    href: "/lesson-plan-generator",
    icon: "bookOpen",
    label: "Lesson Plan Generator",
  },
  {
    title: "Worksheet Generator",
    href: "/worksheet-generator",
    icon: "bookOpen",
    label: "Worksheet Generator",
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

  const { error, data } = await supabase
    .from("user_info")
    .select("id,profession")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  const isRoleTeacher = data.profession === "Teacher";

  const filteredNavItems = isRoleTeacher
    ? navItems
    : navItems.filter(
        (navItem) => !teacherOnlyNavItems.includes(navItem.href ?? "")
      );

  return (
    <div className="flex">
      <DashboardSidebar navItems={filteredNavItems} />
      <main className="w-full flex-1 overflow-hidden">
        <Header email={user.email!} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
