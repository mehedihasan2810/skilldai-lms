import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Message } from "@/components/signin-form-message";
import { createClient } from "@/lib/supabase/server";
import SignInForm from "./signin/form";
import GetToken from "@/components/get-token";

interface PageProps {
  params: {
    courseSlug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  console.log("hello");

  console.log({ searchParams });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log({ user });

  if (user) {
    return redirect("/new");
  }

  return (
    <>
      <GetToken />

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
            <span className="inline-block text-2xl font-semibold">
              Skilld AI
            </span>
          </Link>

          <div className="z-20 my-auto flex flex-col gap-6 text-muted-foreground text-lg">
            <p>Unlock Your Learning Superpowers!</p>
            <p>
              Learn with a Friend! Skilld creates a personalized adventure just
              for you, making complex ideas easy to understand and fun to learn!
            </p>

            <p>Build your own course, create your own quiz - do more with AI</p>
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-muted-foreground">
                &ldquo;Learn with a Friend! Skilld creates a personalized
                adventure just for you, making complex ideas easy to understand
                and fun to learn!&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="p-4 lg:p-8 h-full flex items-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-sm">
            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
}
