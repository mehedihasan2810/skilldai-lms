import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import MinimalTiptapEditor from "@/components/rich-text-editor/minimal-tiptap";
import { Edit, Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSummary } from "@/lib/db";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  //   title: z.string().min(1, "Title is required"),
  summary: z
    .string({
      required_error: "Summary is required",
    })
    .min(1, "Summary is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function EditSummariseDialog({
  summary,
  summaryId,
}: {
  summary: string;
  summaryId: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //   title: "",
      summary: "",
    },
  });

  const updateSummaryMutation = useMutation({
    mutationFn: async ({
      summaryId,
      summary,
    }: {
      summaryId: string;
      summary: string;
    }) =>
      await updateSummary({
        summaryId,
        summary,
      }),
    onSuccess: async (updatedSummaryData) => {
      console.log({ updatedSummaryData });
      await queryClient.invalidateQueries({ queryKey: ["summary", summaryId] });
      await queryClient.invalidateQueries({ queryKey: ["summaryList"] });
      toast.success("Updated successfully.");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message);
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("==Getting values from form==");
    console.log(values);
    console.log("Success: Values retrieved from form");

    updateSummaryMutation.mutate({ summary: values.summary, summaryId });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(v) => setIsDialogOpen(v)}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Edit className="size-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit summary</DialogTitle>
          {/* <DialogDescription>
            Fill in the form below to create a new post.
          </DialogDescription> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              {/* <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Title"
                        className={cn("w-full", {
                          "border-destructive focus-visible:ring-0":
                            form.formState.errors.title,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Summary</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        {...field}
                        throttleDelay={0}
                        className={cn(
                          "h-full min-h-56 max-h-[500px] w-full rounded-xl",
                          {
                            "border-destructive focus-within:border-destructive":
                              form.formState.errors.summary,
                          }
                        )}
                        editorContentClassName="overflow-auto h-full flex grow"
                        output="markdown"
                        placeholder="Type your summary here..."
                        editable={true}
                        editorClassName="focus:outline-none px-5 py-4 h-full grow"
                        value={summary}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            className="w-full flex items-center gap-2"
            onClick={() => {
              form.handleSubmit(onSubmit)();
            }}
            disabled={updateSummaryMutation.isPending}
          >
            {updateSummaryMutation.isPending && (
              <Loader className="size-5 animate-spin" />
            )}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
