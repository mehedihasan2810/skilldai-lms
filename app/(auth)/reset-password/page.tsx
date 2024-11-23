import Link from "next/link";
import Image from "next/image";
import { ResetPasswordForm } from "./form";
import { Message } from "@/components/signin-form-message";
import { createClient } from "@/lib/supabase/server";

export default async function Page(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  console.log({ searchParams });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log({ user });

  // if (!user) {
  //   return redirect("/sign-in");
  // }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-secondary p-10 dark:border-r lg:flex">
        <div className="absolute inset-0 bg-secondary" />
        <Link href="/" className="relative z-20 flex items-center gap-3">
          <Image
            src="/skilld-logo.png"
            alt="Skilld Logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <span className="inline-block text-2xl font-semibold">Skilld AI</span>
        </Link>

        <div className="z-20 my-auto flex flex-col gap-6 text-muted-foreground text-lg">
          <p>
            Share Your Code, Get a Personalised Path Upload your code and
            we&#39;ll create a customised learning journey for you!
          </p>
          <p>
            Stuck on a piece of Code? We&#39;ll Help You Out. Copy the code into
            our platform, and let Skilld guide you through!
          </p>
          <p>
            Understand Concepts with Ease. Skilld&#39;s customised content makes
            complex ideas simple and clear!
          </p>
          <p>
            Learn at Your Own Pace, Anytime Upload your code and learn whenever,
            wherever you want with Skilld!
          </p>
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-muted-foreground">
              &ldquo;Learn to code with a friend by your side! Skilld offers
              personalised lessons, real-time help, and cool projects to make
              coding a breeze!&rdquo;
            </p>
            {/* <footer className="text-sm">Ak</footer> */}
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-sm">
          {/* <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign In To Your Account
            </h1>
          </div> */}
          <ResetPasswordForm message={searchParams} />
        </div>
      </div>
    </div>
  );
}
