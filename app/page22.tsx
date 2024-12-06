import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { GithubIcon, RocketIcon, MenuIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GetToken from "@/components/get-token";
import { ThemeToggle } from "@/components/theme-toggle";
import MobileSidebar from "@/components/mobile-sidebar";
import Navbar from "@/components/navbar";

export default async function LandingPage() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user) {
  //   redirect("/new");
  // }

  return (
    <>
      <GetToken />
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        {/* <header className="border-b border-border/50 shadow-sm sticky top-0 z-10">
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
                <Link href="/">
                  <Button variant="secondary">Sign In</Button>
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header> */}

        <div className=" absolute z-[-1] top-0 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/4 size-full lg:size-[800px] bg-gradient-to-r from-teal-500 to-pink-500 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl bg-gradient-to-r from-teal-500 via-sky-600 to-cyan-500 bg-clip-text text-transparent font-heading">
                {/* Skilld AI: Your AI Coding Learning Assistant */}
                Unlock Your Learning Superpowers!
              </h2>

              <p className="mt-5 max-w-md mx-auto text-base sm:text-lg md:mt-4 md:text-xl md:max-w-4xl text-muted-foreground">
                {/* Learn to code with a friend by your side! Skilld offers
                personalised lessons, real-time help, and cool projects to make
                coding a breeze! */}
              Learn with a Friend! Skilld creates a personalized adventure just for you, making complex ideas easy to understand and fun to learn!
              </p>
              <p className="mt-5 max-w-md mx-auto text-base sm:text-lg md:mt-4 md:text-xl md:max-w-4xl text-muted-foreground">
                {/* Learn to code with a friend by your side! Skilld offers
                personalised lessons, real-time help, and cool projects to make
                coding a breeze! */}
                Build your own course, create your own quiz - do more with AI
              </p>



              <Link
                href="/new"
                className={buttonVariants({
                  className: "mt-6 text-[1rem] ",
                  size: "lg",
                })}
              >
                Get started <ArrowRight className="ml-2"/>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
