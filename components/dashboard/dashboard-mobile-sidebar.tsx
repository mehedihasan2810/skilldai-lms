"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { DashboardNav } from "./dashboard-nav";
import { NavItem } from "@/types/nav";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
  navItems: NavItem[]
}

export function MobileSidebar({ className, navItems }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-1 pb-8 pt-16">
            <DashboardNav
              items={navItems}
              isMobileNav={true}
              setOpen={setOpen}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
