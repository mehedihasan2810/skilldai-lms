"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters long" }),
  // .min(8, { message: "Password must be at least 8 characters long" })
  // .max(72, { message: "Password must not exceed 72 characters" })
  // .regex(/[a-z]/, {
  //   message: "Password must include at least one lowercase letter",
  // })
  // .regex(/[A-Z]/, {
  //   message: "Password must include at least one uppercase letter",
  // })
  // .regex(/\d/, { message: "Password must include at least one number" })
  // .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/, {
  //   message: "Password must include at least one special character",
  // }),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/,
  //   {
  //     message:
  //       "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
  //   }
  // ),
});

const SetPasswordForm = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    const password = values.password;
    // if (!password.trim()) return toast.error("Please enter your password.");
    // if (password.trim().length < 6)
    //   return toast.error("Password should be minimum 6 characters.", {
    //     position: "top-center",
    //   });

    const refreshToken = searchParams.get("refresh_token");

    if (!refreshToken?.trim())
      return toast.error("Invalid token", { position: "top-center" });

    console.log(refreshToken);

    setIsLoading(true);

    const data = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (data.error) {
      setIsLoading(false);
      return toast.error("Invalid token", { position: "top-center" });
    }

    console.log(data.data);

    const { data: userData, error: userError } = await supabase.auth.updateUser(
      { password: password }
    );

    console.log(userData);

    if (userError) {
      console.log(userError);

      setIsLoading(false);
      return toast.error(userError.message, { position: "top-center" });
      // return toast.error(
      //   "Something went wrong while setting the password! Please try again.",
      //   { position: "top-center" }
      // );
    }

    setIsLoading(false);

    router.refresh();
    return router.push(`/new`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set your password</FormLabel>
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
              {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full flex justify-center gap-2"
          // onClick={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading && <LoaderIcon className="animate-spin size-5" />}
          Confirm
        </Button>
      </form>
    </Form>
  );
};

export default SetPasswordForm;
