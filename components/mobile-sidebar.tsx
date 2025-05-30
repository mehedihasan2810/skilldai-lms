import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui";
import { ThemeToggle } from "./theme-toggle";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden">
        <MenuIcon className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent className="w-[350px]">
        <SheetHeader className="flex justify-between  items-center">
          <div></div>
          <SheetTitle className="flex items-center gap-2">
            <Image
              src="/skilld-logo.png"
              alt="Skilld ai logo"
              width={30}
              height={30}
            />{" "}
            Skilld AI
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-8">
          <Link href="/">
            <Button variant="secondary">Sign In</Button>
          </Link>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
