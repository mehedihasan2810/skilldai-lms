"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { saveUserInfo } from "@/lib/db";
import { useRouter } from "nextjs-toploader/app";

const professions = ["Student", "Teacher", "Developer", "Other"];

const formSchema = z.object({
  institution: z.string().trim().min(1, { message: "Required" }),
  profession: z.string().trim().min(1, { message: "Required" }),
});

export const SetupForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const saveUserInfoMutation = useMutation({
    mutationFn: async ({
      userId,
      profession,
      institution,
    }: {
      userId: string;
      profession: string;
      institution: string;
    }) => await saveUserInfo({ userId, profession, institution }),
    onSuccess: (savedData) => {
      console.log({ savedData });

      router.push("/new");
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message);
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

    saveUserInfoMutation.mutate({
      userId,
      profession: values.profession,
      institution: values.institution,
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select your profession" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {professions.map((profession) => (
                    <SelectItem key={profession} value={profession}>
                      {profession}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex justify-center gap-2"
          disabled={saveUserInfoMutation.isPending}
        >
          {saveUserInfoMutation.isPending && (
            <Loader className="animate-spin size-5" />
          )}
          Confirm
        </Button>
      </form>
    </Form>
  );
};
