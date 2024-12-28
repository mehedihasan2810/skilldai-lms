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
import { updateWorksheet } from "@/lib/db";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  worksheet: z
    .string({
      required_error: "Worksheet is required",
    })
    .min(1, "Worksheet is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function WorksheetEditorDialog({
  worksheet,
  worksheetId,
}: {
  worksheet: string;
  worksheetId: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      worksheet: "",
    },
  });

  const updateWorksheetMutation = useMutation({
    mutationFn: async ({
      worksheetId,
      worksheet,
    }: {
      worksheetId: string;
      worksheet: string;
    }) =>
      await updateWorksheet({
        worksheetId,
        worksheets: worksheet,
      }),
    onSuccess: async (updatedWorksheetData) => {
      console.log({ updatedWorksheetData });
      await queryClient.invalidateQueries({
        queryKey: ["worksheet", worksheetId],
      });
      await queryClient.invalidateQueries({ queryKey: ["worksheets"] });
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

    updateWorksheetMutation.mutate({
      worksheet: values.worksheet,
      worksheetId,
    });
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
          <DialogTitle>Edit Worksheet</DialogTitle>
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
                name="worksheet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Worksheet</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        {...field}
                        throttleDelay={0}
                        className={cn(
                          "h-full min-h-56 max-h-[500px] w-full rounded-xl",
                          {
                            "border-destructive focus-within:border-destructive":
                              form.formState.errors.worksheet,
                          }
                        )}
                        editorContentClassName="overflow-auto h-full flex grow"
                        output="markdown"
                        placeholder="Type your worksheet here..."
                        editable={true}
                        editorClassName="focus:outline-none px-5 py-4 h-full grow"
                        value={worksheet}
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
            disabled={updateWorksheetMutation.isPending}
          >
            {updateWorksheetMutation.isPending && (
              <Loader className="size-5 animate-spin" />
            )}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
