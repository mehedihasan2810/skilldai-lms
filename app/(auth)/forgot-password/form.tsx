"use client";
import { forgotPasswordAction } from "@/actions/forgot-password";
import { Message } from "@/components/signin-form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
// import { SmtpMessage } from "../smtp-message";

export function ForgotPasswordForm({ message }: { message: Message }) {
  const { executeAsync, result, isPending } = useAction(forgotPasswordAction, {
    onSuccess: ({ data, input }) => {
      console.log({ data });
      // router.replace("/new");
      toast.success("Check your email for a link to reset your password.", {
        position: "top-center",
        duration: 30000,
      });
    },
    onError: ({ error }) => {
      console.log({ error });
      if (error.serverError) {
        toast.error(error.serverError);
      }
      if (error.validationErrors) {
        toast.error(error.validationErrors.email?.join(", ") ?? "");
      }
    },
  });

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log({ values });
    const result = await executeAsync(values);
    console.log({ result });
  };
  return (
    <Card className="max-w-md w-full border">
      <CardHeader>
        <CardTitle className="text-xl">Send Reset Password Link</CardTitle>
        <CardDescription>
        Enter your email below to receive a link to reset your password.
          {/* {" "}
          Already have an account?{" "}
          <Link className="text-primary underline" href="/signin">
            Sign in */}
          {/* </Link> */}
        </CardDescription>
      </CardHeader>

      <CardContent>
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

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && (
                  <Loader className="animate-spin mr-2" /> 
              )}
              Send Link
            </Button>
          </form>
        </Form>

        {/* <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="Enter your email..." required />
            </div>
            <SubmitButton
              pendingText="Resetting Password..."
              className="w-full"
              formAction={forgotPasswordAction}
            >
              Reset Password
            </SubmitButton>
            <FormMessage message={message} />
          </div>
        </form> */}
        {/* <SmtpMessage /> */}
      </CardContent>
    </Card>
  );
}
