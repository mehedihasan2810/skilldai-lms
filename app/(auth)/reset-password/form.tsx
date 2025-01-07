"use client";
import { resetPasswordAction } from "@/actions/reset-password";
import { Message } from "@/components/signin-form-message";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Loader, Router } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { useRouter } from "nextjs-toploader/app";
import { reportErrorAction } from "@/actions/report-error-via-mail";

export function ResetPasswordForm({ message }: { message: Message }) {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);

  const router = useRouter();

  const { executeAsync, result, isPending } = useAction(resetPasswordAction, {
    onSuccess: ({ data, input }) => {
      console.log({ data });
      // router.replace("/new");
      toast.success("Password has been changed successfully.");

      router.push("/new");
    },
    onError: ({ error }) => {
      console.log({ error });
      if (error.serverError) {
        toast.error(error.serverError);
        reportErrorAction({
          userEmail: "Unknown",
          errorMessage: error.serverError ?? "Unknown",
          errorTrace: `[ResetPasswordForm] [resetPasswordAction] [onError] [app/(auth)/reset-password/form.tsx]`,
          errorSourceUrl: "/reset-password",
        });
      }
      if (error.validationErrors) {
        toast.error(
          `${error.validationErrors.password?.join(", ") ?? ""}. ${
            error.validationErrors.confirmPassword?.join(", ") ?? ""
          }`
        );
        reportErrorAction({
          userEmail: "Unknown",
          errorMessage: `${error.validationErrors.password?.join(", ") ?? ""}. ${
            error.validationErrors.confirmPassword?.join(", ") ?? ""
          }`,
          errorTrace: `[ResetPasswordForm] [resetPasswordAction] [onError] [ValidationError] [app/(auth)/reset-password/form.tsx]`,
          errorSourceUrl: "/reset-password",
        });
      }
    },
  });

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    console.log({ values });
    const result = await executeAsync(values);
    console.log({ result });
  };
  return (
    <Card className="max-w-md w-full border">
      <CardHeader>
        <CardTitle className="text-xl">Reset Password</CardTitle>
        <CardDescription>Please enter your new password below.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pr-11"
                        type={isShowConfirmPass ? "text" : "password"}
                        placeholder="Confirm password..."
                        {...field}
                      />
                      <Button
                        type="button"
                        onClick={() => setIsShowConfirmPass(!isShowConfirmPass)}
                        size="icon"
                        variant="ghost"
                        className="absolute right-4 top-1/2 -translate-y-1/2  size-min"
                      >
                        <Eye className={cn({ hidden: isShowConfirmPass })} />
                        <EyeOff
                          className={cn({ hidden: !isShowConfirmPass })}
                        />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && <Loader className="animate-spin mr-2" />}
              Reset Password
            </Button>
          </form>
        </Form>
        {/* <form className="space-y-4">
     <div className="space-y-1">
      <Label htmlFor="password" >New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      </div>
      <div className="space-y-1">
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      </div>
      <SubmitButton className="w-full" pendingText="Resetting Password..." formAction={resetPasswordAction}>
        Reset password
      </SubmitButton>
      <FormMessage message={message} />
    </form> */}
      </CardContent>
    </Card>
  );
}
