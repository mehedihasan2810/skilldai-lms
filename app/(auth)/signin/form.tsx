"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import { Eye, EyeOff, Loader, Loader2Icon } from "lucide-react";
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
import { SubmitButton } from "@/components/submit-button";
import { signInAction } from "@/actions/auth";
import { Message } from "@/components/signin-form-message";
import { Label } from "@/components/ui";
import { useAction } from "next-safe-action/hooks";
import { signInUser } from "@/actions/sign-in";
import { toast } from "sonner";
import { signInSchema } from "@/lib/validations/auth";

enum FormStatus {
  Idle,
  Loading,
  Error,
  Success,
}

const SignInForm = ({ message }: { message: Message }) => {
  const [isShowPass, setIsShowPass] = useState(false);
  const router = useRouter();

  const { executeAsync, result, isPending } = useAction(signInUser, {
    onSuccess: ({ data, input }) => {
      console.log({ data });
      router.replace("/new");
    },
    onError: ({ error, input }) => {
      console.log({ error });
      if (error.serverError) {
        toast.error(error.serverError);
      }
      if (error.validationErrors) {
        toast.error(
          `${error.validationErrors.email?.join(", ") ?? ""}. ${
            error.validationErrors.password?.join(", ") ?? ""
          }`
        );
      }
    },
  });

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    console.log({ values });
    const result = await executeAsync(values);
    console.log({ result });

    // setFormStatus(FormStatus.Loading);

    // const res = await supabase.auth.signInWithPassword({
    //   email: values.email,
    //   password: values.password,
    // });

    // if (res.error) {
    //   console.error(res.error);
    //   setFormStatus(FormStatus.Error);
    //   toast.error(res.error.message, {
    //     position: "top-center",
    //   });
    //   return;
    // }

    // setFormStatus(FormStatus.Success);
    // toast.success("Signed In! Taking you to the app", {
    //   position: "top-center",
    // });
    // router.refresh();
    // router.push("/new");
  };

  // const handleOAuthSignIn = async (provider: OAuthProviders) => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider,
  //     options: {
  //       redirectTo: `${window.location.origin}/api/auth/callback`,
  //     },
  //   });

  //   if (error) {
  //     console.error(error);
  //     toast.error(error.message, {
  //       position: "top-center",
  //     });
  //   }
  // };

  // const handleGoogleSignIn = () => {
  //   handleOAuthSignIn(OAuthProviders.google);
  // };

  // const handleGitHubSignIn = () => {
  //   handleOAuthSignIn(OAuthProviders.github);
  // };

  return (
    <Card className="max-w-md w-full border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl"> Sign In To Your Account</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
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
                  <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                    <Link
                      className="text-sm underline text-muted-foreground"
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? (
                <>
                  <Loader className="animate-spin mr-2" /> Signing In
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
