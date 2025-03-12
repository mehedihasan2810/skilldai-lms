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
import { signInAction, signUpAction } from "@/actions/auth";
import { Message } from "@/components/signin-form-message";
import { Label } from "@/components/ui";
import { useAction } from "next-safe-action/hooks";
import { signInUser } from "@/actions/sign-in";
import { toast } from "sonner";
import { signInSchema } from "@/lib/validations/auth";
import { reportErrorAction } from "@/actions/report-error-via-mail";
import { createClient } from "@/lib/supabase/client";

export const SignUpForm = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsPending(true);
    const { data, error } = await signUpAction(values);
    if (error) {
      toast.error(error);
    }
    if (data) {
      toast.success("Account created successfully");
      //   router.push("/");
    }
    setIsPending(false);
  };

  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
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

  return (
    <Card className="max-w-md w-full border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl"> Sign Up To Your Account</CardTitle>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? (
                <>
                  <Loader className="animate-spin size-5 mr-2" /> Signing Up
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          variant={"outline"}
          className="w-full"
        >
          <Image
            src={`/google.svg`}
            alt={"google"}
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </Button>

        <div className="flex justify-center items-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
