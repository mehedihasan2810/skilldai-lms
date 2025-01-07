"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
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
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SignInFooter } from "@/components/auth-form-footers";
import { Loader2Icon } from "lucide-react";
import { SocialFooter } from "@/components/social-footer";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { OAuthProviderButton } from "@/components/oauth-provider-button";
import { OAuthProviders } from "@/app/types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { reportErrorAction } from "@/actions/report-error-via-mail";

enum FormStatus {
  Idle,
  Loading,
  Error,
  Success,
}

const formSchema = z.object({
  full_name: z.string(),
  email: z.string(),
  password: z.string(),
});

const SignUpForm = () => {
  const supabase = createClient();

  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormStatus(FormStatus.Loading);

    const { error, data } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.full_name,
        },
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });

    console.log({ data });

    if (error) {
      console.error(error);
      setFormStatus(FormStatus.Error);
      toast.error(error.message, {
        position: "bottom-center",
      });
      reportErrorAction({
        userEmail: "Unknown",
        errorMessage: error.message,
        errorTrace: `[SignUpForm] [onSubmit] [supabase.auth.signUp] [app/(auth)/signup/form.tsx]`,
        errorSourceUrl: "/signup",
      });
      return;
    }

    toast.success("Check your email for the confirmation link", {
      position: "bottom-center",
    });
    setFormStatus(FormStatus.Success);
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
      toast.error("Could not Sign In", {
        position: "top-right",
      });
      reportErrorAction({
        userEmail: "Unknown",
        errorMessage: `Could not Sign In with ${provider}`,
        errorTrace: `[SignUpForm] [handleOAuthSignIn] [supabase.auth.signInWithOAuth] [app/(auth)/signup/form.tsx]`,
        errorSourceUrl: "/signup",
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
    <main className="flex flex-col gap-6 items-center w-full h-screen pt-32 px-4">
      <Link href="/">
        <h1 className="text-4xl font-bold">Skilld AI</h1>
      </Link>

      <Card className="max-w-sm w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* <OAuthProviderButton
            provider={OAuthProviders.google}
            onClick={handleGoogleSignIn}
          >
            Sign up with Google
          </OAuthProviderButton>

          <OAuthProviderButton
            provider={OAuthProviders.github}
            onClick={handleGitHubSignIn}
          >
            Sign in with GitHub
          </OAuthProviderButton> */}

          {/* <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-neutral-500 text-sm">OR</span>
            <Separator className="flex-1" />
          </div> */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@email.com" {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {formStatus === FormStatus.Loading && (
                  <>
                    <Loader2Icon className="animate-spin mr-2" /> Signing up
                  </>
                )}

                {formStatus !== FormStatus.Loading && "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex items-center justify-center">
          <SignInFooter />
        </CardFooter>
      </Card>

      {/* <SocialFooter /> */}
    </main>
  );
};

export default SignUpForm;
