"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader } from "lucide-react";
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
import { setPasswordAction } from "@/actions/set-password";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { reportErrorAction } from "@/actions/report-error-via-mail";

const formSchema = z.object({
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
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
  const router = useRouter();

  const searchParams = useSearchParams();

  const { executeAsync, result, isPending } = useAction(setPasswordAction, {
    onSuccess: ({ data }) => {
      console.log({ data });
      toast.success("Password has been added successfully.");

      router.push("/setup");
    },
    onError: ({ error }) => {
      console.log({ error });
      if (error.serverError) {
        toast.error(error.serverError);
        reportErrorAction({
          userEmail: "Unknown",
          errorMessage: error.serverError,
          errorTrace: `[SetPasswordForm] [setPasswordAction] [onError] [app/(auth)/set-password/form.tsx]`,
          errorSourceUrl: "/set-password",
        });
      }
      if (error.validationErrors) {
        toast.error(
          `${error.validationErrors.password?.join(", ") ?? ""}. ${
            error.validationErrors.refreshToken?.join(", ") ?? ""
          }`
        );
        reportErrorAction({
          userEmail: "Unknown",
          errorMessage: `${error.validationErrors.password?.join(", ") ?? ""}. ${
            error.validationErrors.refreshToken?.join(", ") ?? ""
          }`,
          errorTrace: `[SetPasswordForm] [setPasswordAction] [onError] [ValidationError] [app/(auth)/set-password/form.tsx]`,
          errorSourceUrl: "/set-password",
        });
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    const password = values.password;

    const refreshToken = searchParams.get("refresh_token") ?? "";

    await executeAsync({
      password,
      refreshToken,
    });
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

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full flex justify-center gap-2"
          disabled={isPending}
        >
          {isPending && <Loader className="animate-spin size-5" />}
          Confirm
        </Button>
      </form>
    </Form>
  );
};

export default SetPasswordForm;
