"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { DashboardNav } from "./dashboard-nav";
// import { navItems } from "@/config";
import Image from "next/image";
import { Button } from "../ui";
import { NavItem } from "@/types/nav";

type SidebarProps = {
  className?: string;
  navItems: NavItem[];
};

export default function DashboardSidebar({
  className,
  navItems,
}: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block shadow-sm`,
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link href={"/new"} className="flex items-center gap-2">
          <Image
            src="/skilld-logo.png"
            alt="Skilld logo"
            width={30}
            height={30}
          />
          <h2
            className={cn("font-bold text-lg truncate", {
              hidden: isMinimized,
            })}
          >
            Skilld AI
          </h2>
        </Link>
      </div>
      <Button
        className={cn(
          "absolute -right-4 top-12 z-50 cursor-pointer bg-background text-3xl text-foreground hover:opacity-70 h-8 w-8",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
        variant="outline"
        size="icon"
      >
        <ChevronLeft />
      </Button>

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
