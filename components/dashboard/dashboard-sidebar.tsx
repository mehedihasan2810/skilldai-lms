"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, PanelLeftClose, PanelRightClose } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { DashboardNav } from "./dashboard-nav";
import { navItems } from "@/config";
import Image from "next/image";

type SidebarProps = {
  className?: string;
};

export default function DashboardSidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link
          href={"/courses"}
          target="_blank"
          className="flex items-center gap-2"
        >
          <Image
            src="/skilld-logo.png"
            alt="Skilld logo"
            width={30}
            height={30}
          />
           <h2 className={cn("font-bold text-lg truncate", {"hidden": isMinimized})}>Skilld AI</h2>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg> */}
        </Link>
      </div>
      <PanelLeftClose
        className={cn(
          "absolute -right-3 top-10 z-50 cursor-pointer bg-background text-3xl text-foreground hover:opacity-70",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
