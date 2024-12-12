import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { MobileSidebar } from "./dashboard-mobile-sidebar";
import { UserNav } from "../user-nav";
import Link from "next/link";
import { buttonVariants } from "../ui";
import { NavItem } from "@/types/nav";

export default function Header({email, navItems}: {email: string, navItems: NavItem[]}) {
  return (
    <header className="sticky inset-x-0 top-0 w-full border-b bg-card text-card-foreground shadow-sm">
      <nav className="flex items-center justify-between px-4 py-3 md:justify-end">
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar navItems={navItems} />
        </div>
        <div className="flex items-center gap-6">
          <Link className={buttonVariants()} href="/new">
            Skilld AI
          </Link>
          <UserNav email={email} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
