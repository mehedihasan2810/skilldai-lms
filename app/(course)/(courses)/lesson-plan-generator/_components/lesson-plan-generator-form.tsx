"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useRouter } from "nextjs-toploader/app";
import { Textarea } from "@/components/ui";
import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import Markdown from "@/components/markdown/markdown";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLessonPlan, saveLessonPlan } from "@/lib/db";

const outputSchema = z.object({
  title: z.string().describe("A max eight-word title for the lesson plan."),
  plan: z.string().describe("The actual lesson plan content."),
});

export const formSchema = z.object({
  topic: z.string().trim().min(1, { message: "Required" }),
  focusingOn: z.string(),
  gradeLevel: z.string(),
  style: z.string(),
  duration: z.string(),
  previousLessonInfo: z.string(),
});

export const LessonPlanForm = ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      focusingOn: "",
      gradeLevel: "",
      style: "",
      duration: "",
      previousLessonInfo: "",
    },
  });

  const saveLessonPlanMutation = useMutation({
    mutationFn: async ({
      userId,
      title,
      plan,
      topic,
      gradeLevel,
      focusingOn,
      style,
      duration,
      previousLessonInfo,
    }: {
      userId: string;
      title: string;
      plan: string;
      topic: string;
      gradeLevel: string;
      focusingOn: string;
      style: string;
      duration: string;
      previousLessonInfo: string;
    }) =>
      await saveLessonPlan({
        userId,
        title,
        plan,
        topic,
        gradeLevel,
        focusingOn,
        style,
        duration,
        previousLessonInfo,
      }),
    onSuccess: async (savedData) => {
      console.log({ savedData });

      await queryClient.invalidateQueries({ queryKey: ["lessonPlans"] });

      router.push(`/lesson-plan-generator/${savedData.id}`);
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message);
    },
  });

  const {
    submit,
    object: lessonPlan,
    isLoading,
  } = useObject({
    api: "/api/generate-lesson-plan",
    schema: outputSchema,
    // initialValue: undefined,
    onError: (lessonPlanError) => {
      console.log({ lessonPlanError });
      toast.error(lessonPlanError.message);
    },
    onFinish: async ({ object }) => {
      try {
        if (!object) {
          throw new Error("Something went wrong!");
        }
        console.log({ object });

        saveLessonPlanMutation.mutate({
          title: object.title,
          plan: object.plan,
          userId: userId,
          topic: form.watch("topic"),
          gradeLevel: form.watch("gradeLevel"),
          focusingOn: form.watch("focusingOn"),
          style: form.watch("style"),
          duration: form.watch("duration"),
          previousLessonInfo: form.watch("previousLessonInfo"),
        });
      } catch (error) {
        console.log({ error });
        toast.error((error as Error).message);
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    submit({ inputData: { ...values, userId, userEmail } });
  };

  console.log({ lessonPlan });

  if ((lessonPlan && isLoading) || saveLessonPlanMutation.isPending) {
    return (
      <>
        <div className="relative mb-16 mt-8 bg-card w-fit rounded-xl p-6 max-w-4xl mx-auto shadow-md border border-border/50">
          <Button
            variant="outline"
            className="absolute -top-5 left-1/2 -translate-x-1/2"
          >
            <Loader className="size-5 animate-spin mr-2" /> Generating...
          </Button>
          <h1 className="text-2xl font-bold mb-2 mt-6">
            {lessonPlan?.title ?? ""}
          </h1>
          <Markdown text={lessonPlan?.plan ?? ""} className="w-full" />
        </div>
      </>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto w-full mt-10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Lesson Plan Generator</CardTitle>
        <CardDescription>
          Enter the details, and we&#39;ll generate a complete lesson plan.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Topic</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter the  general subject of the lesson (eg: History, Math)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="focusingOn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Focusing On (optional)</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter topics to  focus on (eg: industrial revolution)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level (optional)</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter difficulty level (eg: 3rd grade, beginners)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Style (optional)</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter style for the lesson (eg:creative, lecture)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Duration (In minutes) (optional)</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter duration of the lesson (eg: 30 minutes)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousLessonInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Lesson Information (optional)</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Describe the previous lesson to create a continuing plan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <Loader className="animate-spin size-5" />
              ) : (
                "Generate Lesson Plan"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const dummyLessonPlan = `
### Lesson Plan: Introduction to the Industrial Revolution

**Grade Level:** Beginners  
**Lesson Duration:** 30 minutes  
**Lesson Style:** Creative  

#### Objectives:
1. Students will be able to identify three major changes that occurred during the Industrial Revolution.
2. Students will understand the impact of the Industrial Revolution on daily life.
3. Students will engage creatively with the material through a role-play activity.

#### Previous Lesson:
N/A - This is an introductory lesson on the Industrial Revolution.

#### Beginning of the Lesson:
**Starter Activity: "Time Travel Talk"**
- Begin the lesson with a brief imaginative exercise. Ask students to close their eyes and imagine they are time travelers visiting the world before the Industrial Revolution. Describe a rural, agrarian society where most goods are handmade.
- Transition by asking, "What if I told you that in just a few decades, the world you just imagined would change dramatically? Let's find out how."

#### Learning/Inquiry:
**Interactive Lecture with Visual Aids**
- Use a PowerPoint presentation to introduce the Industrial Revolution, starting in the late 18th century. Highlight key inventions like the steam engine, the spinning jenny, and the power loom.
- Discuss the shift from agrarian to industrial societies, emphasizing changes in daily life, such as urbanization and the rise of factories.
- Incorporate short, engaging video clips (2-3 minutes) that show simulations of factories or animations explaining key inventions.

#### Practice/Experience:
**Role-Play Activity: "A Day in the Life"**
- Divide the class into small groups. Assign each group a role: factory workers, factory owners, or farmers before the Industrial Revolution.
- Provide each group with a scenario card that describes their daily life and challenges. Allow 5 minutes for preparation.
- Have groups perform a 2-minute role-play in front of the class, depicting their assigned roles.

#### Assessment:
**Quick Reflection Quiz & Discussion**
- Conduct a 5-question quiz to assess understanding of key concepts (e.g., significance of inventions, changes in lifestyle).
- Follow with a class discussion where students can share what surprised them the most about the changes during the Industrial Revolution.

#### Summary:
**Recap and Key Takeaways**
- Summarize the major points covered: key inventions, the shift from rural to urban life, and the socio-economic impacts.
- Highlight how these changes laid the groundwork for the modern world.

#### Homework:
**Research Assignment**
- Assign students to research one major invention of the Industrial Revolution not covered in class. They should prepare a short paragraph on how it works and its impact on society, to be shared in the next class.

#### Resources Required:
- Computer and projector for PowerPoint presentation.
- Access to short educational videos about the Industrial Revolution.
- Printed scenario cards for the role-play activity.
- Quiz materials (can be paper-based or digital).

This lesson plan is designed to be engaging and informative, providing students with a foundational understanding of one of history's most transformative periods through interactive and creative learning methods.
`;
