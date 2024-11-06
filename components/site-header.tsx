"use client"

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "./ui";
import { MobileNav } from "./mobile-nav";
// import { MainNav } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card text-card-foreground">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        {/* <MainNav /> */}
        <Link href="/courses" className="mr-4 items-center space-x-2 lg:mr-6 hidden lg:flex">
          {/* <Icons.logo className="h-6 w-6" /> */}
          <span className="hidden font-bold lg:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <MobileNav />
        <div className="flex  items-center justify-between space-x-2 md:justify-end">
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
            comand menu
          </div> */}
          <nav className="flex items-center gap-6">
            <Link
              href="/new"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/new" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Skilld AI
            </Link>
            <Link
              href="/reports"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/courses" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Dashboard
            </Link>
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "h-8 w-8 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "h-8 w-8 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
