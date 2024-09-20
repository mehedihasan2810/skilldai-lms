import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { GithubIcon, RocketIcon, MenuIcon } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GetToken from "@/components/get-token";
import { ThemeToggle } from "@/components/theme-toggle";
import MobileSidebar from "@/components/mobile-sidebar";

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

              <MobileSidebar />

              {/* <label htmlFor="menu-toggle" className="sm:hidden cursor-pointer">
                <MenuIcon className="h-6 w-6" />
              </label> */}

              {/* <input type="checkbox" id="menu-toggle" className="hidden" /> */}

              <nav className="hidden sm:flex flex-col sm:flex-row items-center gap-4 absolute sm:static left-0 right-0 top-full sm:bg-transparent shadow-md sm:shadow-none pb-4 sm:pb-0">
                <Link href="/signin">
                  <Button variant="secondary">Sign In</Button>
                </Link>
                <ThemeToggle />
                {/* <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link> */}
              </nav>
            </div>
          </div>
        </header>

        <div className=" absolute z-[-1] top-0 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/4 size-full lg:size-[800px] bg-gradient-to-r from-teal-500 to-pink-500 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl bg-gradient-to-r from-teal-500 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
                Skilld AI: Your AI Coding Learning Assistant
              </h2>

              <p className="mt-5 max-w-md mx-auto text-base sm:text-lg md:mt-4 md:text-xl md:max-w-3xl text-muted-foreground">
                Learn to code with a friend by your side! Skilld offers
                personalised lessons, real-time help, and cool projects to make
                coding a breeze!
              </p>

              <Link
                href="/new"
                className={buttonVariants({
                  className: "mt-6 text-xl",
                  size: "lg",
                })}
              >
                Get started
              </Link>

              {/* <CTABar />

            <div className="mt-12 flex flex-col items-center gap-4">
              <h3 className="text-md font-medium text-gray-500 text-center">
                Supported LLM Providers
              </h3>
              <div className="flex flex-row items-center gap-8">
                <Link href="https://www.anthropic.com/" target="_blank">
                  <Image
                    src="/anthropic.svg"
                    alt="Anthropic"
                    width={143}
                    height={16}
                  />
                </Link>

                <Link href="https://openai.com/" target="_blank">
                  <Image
                    src="/openai.svg"
                    alt="OpenAI"
                    width={118 * 0.75}
                    height={32 * 0.75}
                  />
                </Link>
              </div>
            </div> */}
            </div>
            {/* <div className="relative">
            <Image
              src="/demo.png"
              alt="Open Artifacts Demo"
              width={1200}
              height={675}
              className="rounded-lg shadow-2xl pt-1"
            />
          </div> */}

            {/* <div className="mt-20 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              📸 Crop and 🔊 Talk: Iterate Naturally
            </h3>
            <p className="max-w-lg text-center text-lg text-gray-600 mb-8">
              Our Crop and Talk feature allows you to visually select areas of
              your artifacts and say or type your changes, creating a more
              natural and context-aware iteration process.
            </p>

            <div className="mb-8">
              <Image
                src="/crop-and-talk.png"
                alt="Crop and Talk Feature"
                width={1200}
                height={675}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <CTABar />
          </div> */}
          </div>
        </main>

        {/* <footer className="">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; 2024 Open Artifacts. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1 mt-4 text-center">
            <span>Built by</span>
            <a
              href="https://www.linkedin.com/in/13point5/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold transition hover:text-gray-600 flex items-center gap-1"
            >
              Sriraam
            </a>
            <span>|</span>
            <span>Open Sourced on</span>
            <a
              href="https://github.com/13point5/open-artifacts"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold transition hover:text-gray-600 flex items-center gap-1"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer> */}
      </div>
    </>
  );
}

const CTABar = () => (
  <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
    <div className="rounded-md shadow">
      <Link href="/new">
        <Button
          size="lg"
          className="w-full bg-gradient-to-b from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600"
        >
          <RocketIcon className="mr-2 h-4 w-4" />
          Get Started for FREE
        </Button>
      </Link>
    </div>

    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
      <a
        href="https://github.com/13point5/open-artifacts"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="lg" className="w-full">
          <Image
            src="/github.svg"
            alt="GitHub"
            width={20}
            height={20}
            className="mr-2"
          />
          View on GitHub
        </Button>
      </a>
    </div>
  </div>
);
