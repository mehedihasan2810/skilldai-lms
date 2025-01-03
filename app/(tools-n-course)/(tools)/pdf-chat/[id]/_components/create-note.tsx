import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, Input } from "@/components/ui";
import { MinimalTiptapEditor } from "@/components/rich-text-editor";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createNote } from "@/lib/db";
import { Loader } from "lucide-react";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Required",
    })
    .min(1, "Required"),
  note: z
    .string({
      required_error: "Required",
    })
    .min(1, "Required"),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateNote = ({ pdfChatId }: { pdfChatId: string }) => {
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      note: "",
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: async ({
      title,
      note,
      pdfChatId,
    }: {
      title: string;
      note: string;
      pdfChatId: string;
    }) =>
      await createNote({
        title,
        note,
        pdfChatId,
      }),
    onSuccess: async (updatedLessonPlanData) => {
      console.log({ updatedLessonPlanData });
      await queryClient.invalidateQueries({
        queryKey: ["pdfChatNotes", pdfChatId],
      });
      toast.success("Saved successfully.");
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message);
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);

    createNoteMutation.mutate({ ...values, pdfChatId });
  };

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Note title..."
                      className={cn("w-full", {
                        "border-destructive focus-visible:ring-0":
                          form.formState.errors.title,
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Worksheet</FormLabel>
                  <FormControl>
                    <MinimalTiptapEditor
                      {...field}
                      throttleDelay={0}
                      className={cn("min-h-56 h-56 w-full rounded-xl", {
                        "border-destructive focus-within:border-destructive":
                          form.formState.errors.note,
                      })}
                      editorContentClassName="overflow-auto h-full flex grow"
                      output="markdown"
                      placeholder="Write something awesome..."
                      editable={true}
                      editorClassName="focus:outline-none px-5 py-4 h-full grow"
                      //   value={""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="flex items-center gap-2"
              disabled={createNoteMutation.isPending}
            >
              {createNoteMutation.isPending && (
                <Loader className="size-5 animate-spin" />
              )}{" "}
              Save Note
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
