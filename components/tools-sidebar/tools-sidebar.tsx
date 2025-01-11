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
  PieChart,
  Settings2,
  ShieldQuestion,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
      ],
    },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
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
          url: "/quiz-generator",
          icon: ShieldQuestion,
        },
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
        {
          title: "AI Skill Assessment",
          url: "/skill-assessment",
          icon: BookOpenCheck,
        },
      ],
    },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "AI Tools",
      url: "/tools",
      icon: Book,
    },
    {
      name: "Courses",
      url: "/courses",
      icon: Book,
    },
    {
      name: "Course Generator",
      url: "/courses/create",
      icon: GraduationCap,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: AreaChart,
    },

    {
      name: "Quiz Generator",
      url: "/quiz-from-doc",
      icon: ShieldQuestion,
    },
    {
      name: "Lesson Plan Generator",
      url: "/lesson-plan-generator",
      icon: BookOpenCheck,
    },
    {
      name: "Worksheet Generator",
      url: "/worksheet-generator",
      icon: BookOpenCheck,
    },
    {
      name: "PDF Chat",
      url: "/pdf-chat",
      icon: BookOpenCheck,
    },
    {
      name: "AI Skill Assessment",
      url: "/skill-assessment",
      icon: BookOpenCheck,
    },
    // {
    //   name: "Design Engineering",
    //   url: "#",
    //   icon: Frame,
    // },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "", email: userEmail, avatar: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
