"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui";
import { ThemeToggle } from "./theme-toggle";
// import { useSupabase } from "@/lib/supabase";

const Navbar = () => {
//   const { session } = useSupabase();

//   console.log({ session });

  return (
    <header className="border-b border-border/50 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/skilld-logo.png"
              alt="Skilld AI logo"
              width={35}
              height={35}
            />
            <h1 className="text-3xl font-bold">Skilld AI</h1>
          </div>

          <div className="flex sm:flex-row items-center gap-4 ">
            {/* {session ? (
              <Link className={buttonVariants({})} href="/new">To Assistant</Link>
            ) : (
              <Link href="/signin">
                <Button variant="secondary">Sign In</Button>
              </Link>
            )} */}

            <Link href="/signin">
              <Button variant="secondary">Sign In</Button>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
