import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { MobileSidebar } from "./dashboard-mobile-sidebar";
import { UserNav } from "../user-nav";
import Link from "next/link";
import { buttonVariants } from "../ui";

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full border-b bg-card text-card-foreground shadow-sm">
      <nav className="flex items-center justify-between px-4 py-3 md:justify-end">
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-6">
          <Link className={buttonVariants({ variant: "ghost" })} href="/new">
            Skilld AI
          </Link>
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
