"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui";
import { Loader, MessageCircleMore } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addFeedback } from "@/lib/db";
import toast from "react-hot-toast";
// import { useSupabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  feedback: z.string().min(1, { message: "Required" }),
});

const FeedbackForm = ({ expanded = false, email }: { expanded?: boolean, email: string }) => {
  // const { session } = useSupabase();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createFeedbackMutation = useMutation({
    mutationFn: async ({
      feedback,
      email,
    }: {
      feedback: string;
      email: string;
    }) => await addFeedback(feedback, email),
    onSuccess: (createdFeedback) => {
      console.log({ createdFeedback });
      setIsDialogOpen(false);

      toast.success("Feedback has been successfully sent.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // const email = session?.user.email;


    createFeedbackMutation.mutate({
      feedback: values.feedback,
      email: email as string,
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={(v) => setIsDialogOpen(v)}>
      <DialogTrigger
        className={buttonVariants({
          variant: expanded ? "ghost" : "outline",
          size: expanded ? "default" : "icon",
          className: cn("flex gap-2 items-center", { "w-full": expanded }),
        })}
      >
        {expanded ? (
          <>
            <MessageCircleMore />
            Feedback
          </>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <MessageCircleMore />
            </TooltipTrigger>
            <TooltipContent side="right">Feedback</TooltipContent>
          </Tooltip>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Provide feedback</DialogTitle>
          {/* <DialogDescription>
            What do you think about this project? What can be improved?
          </DialogDescription> */}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    What do you think about this project? What can be improved?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your feedback here..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={createFeedbackMutation.isPending}
              className="w-full flex items-center gap-2"
              type="submit"
            >
              {createFeedbackMutation.isPending && (
                <Loader className="size-5 animate-spin" />
              )}
              Send
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
