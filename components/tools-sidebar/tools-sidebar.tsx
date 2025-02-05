"use client";

import * as React from "react";
import {
  AreaChart,
  AudioWaveform,
  Book,
  BookOpen,
  BookOpenCheck,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  GraduationCap,
  Map,
  PenTool,
  PieChart,
  Settings2,
  ShieldQuestion,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { NavProjects } from "./projects";
import Image from "next/image";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navCareers: [
    {
      title: "Careers",
      url: "#",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "AI Skill Assessment",
          url: "/skill-assessment",
        },
        {
          title: "Explore careers",
          url: "/careers",
        },
      ],
    },
  ],
  navMain: [
    {
      title: "Curriculum",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "NCERT",
          url: "/ncert",
        },
        // {
        //   title: "Exams",
        //   url: "/exam-paper",
        // },
      ],
    },
  ],

  navTools: [
    {
      title: "AI Tools",
      url: "#",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "All AI Tools",
          url: "/tools",
          icon: Book,
        },
        {
          title: "Courses",
          url: "/courses",
          icon: Book,
        },
        {
          title: "Course Generator",
          url: "/courses/create",
          icon: GraduationCap,
        },
        {
          title: "Reports",
          url: "/reports",
          icon: AreaChart,
        },

        {
          title: "Quiz Generator",
          url: "/quiz-from-doc",
          icon: ShieldQuestion,
        },
        // {
        //   title: "Quiz Generator",
        //   url: "/quiz-generator",
        //   icon: ShieldQuestion,
        // },
        {
          title: "Lesson Plan Generator",
          url: "/lesson-plan-generator",
          icon: BookOpenCheck,
        },
        {
          title: "Worksheet Generator",
          url: "/worksheet-generator",
          icon: BookOpenCheck,
        },
        {
          title: "PDF Chat",
          url: "/pdf-chat",
          icon: BookOpenCheck,
        },
      ],
    },
  ],
};

const teacherOnlyNavItems = ["/lesson-plan-generator", "/worksheet-generator"];

export function AppSidebar({
  userProfession,
  userEmail,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userProfession: string;
  userEmail: string;
}) {
  const isRoleTeacher = userProfession === "Teacher";

  const filteredNavItems = isRoleTeacher
    ? data.navTools
    : data.navTools.filter(
        (navItem) => !teacherOnlyNavItems.includes(navItem.url ?? "")
      );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="overflow-x-hidden">
        <Link
          href={"/new"}
          className="text-center text-lg font-bold mt-4 flex items-end gap-2 flex-1 overflow-x-hidden"
        >
          <Image
            className="-translate-y-1"
            src={"/skilld-logo.png"}
            alt="logo"
            width={25}
            height={25}
          />{" "}
          <span className="inline-block">Skilld</span>
        </Link>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* <NavProjects projects={data.projects} /> */}
        <NavMain items={filteredNavItems} />
        <NavMain items={data.navCareers} />
        <NavMain items={data.navMain} />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href={`/exam-paper`}>
                <SidebarMenuButton tooltip="Exams">
                  <BookOpenCheck />
                  <span>Exams</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "", email: userEmail, avatar: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
