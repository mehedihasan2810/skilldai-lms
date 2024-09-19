"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Eye, EyeOff, Loader, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import {
  ForgotPasswordFooter,
  SignUpFooter,
} from "@/components/auth-form-footers";
import { SocialFooter } from "@/components/social-footer";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { OAuthProviderButton } from "@/components/oauth-provider-button";
import { OAuthProviders } from "@/app/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

enum FormStatus {
  Idle,
  Loading,
  Error,
  Success,
}

const SignInForm = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // state for signin progress, error, and success
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormStatus(FormStatus.Loading);

    const res = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (res.error) {
      console.error(res.error);
      setFormStatus(FormStatus.Error);
      toast.error(res.error.message, {
        position: "top-center",
      });
      return;
    }

    setFormStatus(FormStatus.Success);
    toast.success("Signed In! Taking you to the app", {
      position: "top-center",
    });
    // router.refresh();
    // router.push("/new");
  };

  const handleOAuthSignIn = async (provider: OAuthProviders) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const handleGoogleSignIn = () => {
    handleOAuthSignIn(OAuthProviders.google);
  };

  const handleGitHubSignIn = () => {
    handleOAuthSignIn(OAuthProviders.github);
  };

  return (
    // <main className="flex flex-col gap-6 items-center w-full h-screen pt-32 px-4">
    //   <Link href="/" className="flex items-center gap-4">
    //     <Image
    //       src="/skilld-logo.png"
    //       alt="Skilld ai logo"
    //       width={40}
    //       height={40}
    //     />
    //     <h1 className="text-4xl font-bold">Skilld AI</h1>
    //   </Link>
      <Card className="max-w-sm w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* <OAuthProviderButton
            provider={OAuthProviders.google}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </OAuthProviderButton>

          <OAuthProviderButton
            provider={OAuthProviders.github}
            onClick={handleGitHubSignIn}
          >
            Sign in with GitHub
          </OAuthProviderButton>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-neutral-500 text-sm">OR</span>
            <Separator className="flex-1" />
          </div> */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="pr-11"
                          type={isShowPass ? "text" : "password"}
                          placeholder="Enter your password..."
                          {...field}
                        />
                        <Button
                          type="button"
                          onClick={() => setIsShowPass(!isShowPass)}
                          size="icon"
                          variant="ghost"
                          className="absolute right-4 top-1/2 -translate-y-1/2  size-min"
                        >
                          <Eye className={cn({ hidden: isShowPass })} />
                          <EyeOff className={cn({ hidden: !isShowPass })} />
                        </Button>
                      </div>
                      {/* <Input type="password" {...field} /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {formStatus === FormStatus.Loading && (
                  <>
                    <Loader className="animate-spin mr-2" /> Signing In
                  </>
                )}

                {formStatus !== FormStatus.Loading && "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>

        {/* <CardFooter className="flex flex-col gap-2">
          <ForgotPasswordFooter />
          <SignUpFooter />
        </CardFooter> */}
      </Card>

      // {/* <SocialFooter /> */}
    // {/* </main> */}
  );
};

export default SignInForm;
