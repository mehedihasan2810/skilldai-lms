"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader, LoaderIcon } from "lucide-react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
import { createClient } from "@/lib/supabase/client";
import { setPasswordAction } from "@/actions/set-password";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
// import { useSupabase } from "@/lib/supabase";

const formSchema = z.object({
  institution: z.string().trim().min(1, { message: "Required" }),
  profession: z.string().trim().min(1, { message: "Required" }),
});

export const SetupForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const { executeAsync, result, isPending } = useAction(setPasswordAction, {
    onSuccess: ({ data, input }) => {
      console.log({ data });
      toast.success("Password has been updated successfully.");

      router.push("/new");
    },
    onError: ({ error }) => {
      console.log({ error });
      if (error.serverError) {
        toast.error(error.serverError);
      }
      if (error.validationErrors) {
        toast.error(
          `${error.validationErrors.password?.join(", ") ?? ""}. ${
            error.validationErrors.refreshToken?.join(", ") ?? ""
          }`
        );
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution: "",
      profession: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    const password = values.institution;

    const refreshToken = searchParams.get("refresh_token") ?? "";

    const result = await executeAsync({
      password,
      refreshToken,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School / University / Company Name</FormLabel>
              <FormControl>
                <Input
                  className="pr-11"
                  type="text"
                  placeholder="Enter your school / university / company name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <FormControl>
                <Input
                  className="pr-11"
                  type="text"
                  placeholder="eg: student or teacher or developer"
                  {...field}
                />
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
