import { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SignInForm from "./form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Sign In | Skilld",
  description: "Sign In to restart your journey with Skilld.",
};

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/new");
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8 hidden"
        )}
      >
        Sign Up
      </Link>
      <div className="relative hidden h-full flex-col bg-secondary p-10 dark:border-r lg:flex">
        <div className="absolute inset-0 bg-secondary" />
        <Link
          href="/dashboard"
          className="relative z-20 flex items-center gap-3"
        >
          <Image
            src="/skilld-logo.png"
            alt="Skilld Logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <span className="inline-block text-2xl font-semibold">Skilld AI</span>
          {/* <Image
            src="/Skilld AI Logos/Skilld Logo-colour.png"
            alt="Skilld Logo"
            width={100}
            height={30}
            className="dark:hidden h-[25px] w-[80px] md:w-[100px] md:h-[30px] object-contain"
          /> */}
        </Link>
        {/* <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
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
          </svg>
          Skilld
        </div> */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-muted-foreground">
              &ldquo;An intelligent chatbot designed to assist with coding
              questions, provide real-time solutions, and help streamline
              development tasks across multiple programming languages.&rdquo;
            </p>
            {/* <footer className="text-sm">Ak</footer> */}
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-sm">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign In To Your Account
            </h1>
            {/* <p className="text-sm text-muted-foreground">
              Enter your email and password below to create your account
            </p> */}
          </div>
          <SignInForm />
          {/* <div>
            <p className="text-center text-sm text-muted-foreground">
              Don&#39;t have an account?{" "}
              <Link href="/" className="underline hover:text-primary">
                Sign Up
              </Link>
            </p> */}
          {/* <p className="mt-2 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

// import SignInForm from "./form";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// const SignInPage = async () => {
//   const supabase = createServerComponentClient({ cookies });

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {
//     redirect("/new");
//   }

//   return <SignInForm />;
// };

// export default SignInPage;
