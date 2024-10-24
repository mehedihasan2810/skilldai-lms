"use client";

import {
  courseSchema,
  notificationSchema,
} from "@/app/api/generate-course/schema";
import { Button, Card, CardContent } from "@/components/ui";
import { useSupabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { experimental_useObject as useObject } from "ai/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import PageContainer from "@/components/dashboard/page-container";
import { Loader, Loader2, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  courseTopic: z.string().min(1, { message: "Required" }),
  difficultyLabel: z.string().min(1, { message: "Required" }),
  targetAudience: z.string().min(1, { message: "Required" }),
});

const Page = () => {
  const queryClient = useQueryClient();
  const { session } = useSupabase();
  const [isCourseSaveComplete, setIsCourseSaveComplete] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseTopic: "",
      difficultyLabel: "",
      targetAudience: "",
    },
  });

  const { submit, isLoading, object, stop, error } = useObject({
    api: "/api/generate-course",
    schema: courseSchema,
    onError: (error) => {
      console.log("Error");
      console.log({ error });
      toast.error(error.message);
    },
    onFinish: async (objectData) => {
      console.log("finish");
      console.log(objectData);
      try {
        if (objectData.error) {
          console.log("finish error ", objectData.error);
          throw new Error(objectData.error.message);
        }
        setIsCourseSaveComplete(true);
        const supabase = createClientComponentClient();

        const { object: generatedCourse } = objectData;

        if (!generatedCourse) {
          toast.error("Something went wrong! Try again");
          return;
        }

        const { data: course, error: courseError } = await supabase
          .from("courses")
          .insert({
            title: generatedCourse.title,
            description: generatedCourse.description,
            user_email: session?.user.email ?? "",
            topic: form.getValues("courseTopic"),
            difficulty: form.getValues("difficultyLabel"),
            target_audience: form.getValues("targetAudience"),
          })
          .select("*")
          .single();

        if (courseError) {
          console.error("Error inserting course:", courseError);
          setIsCourseSaveComplete(false);
          throw new Error("Failed to insert course");
          // return new Response("Failed to insert course", { status: 500 });
        }

        queryClient.setQueryData<any[]>(["courses"], (oldCourses) => {
          return [course, ...(oldCourses || [])];
        });

        console.log("Inserted course");

        const sections = generatedCourse.sections;

        for (const section of sections) {
          const { title: sectionTitle, content, quizzes } = section;

          const { data: insertedSection, error: sectionError } = await supabase
            .from("course_sections")
            .insert({
              course_id: course.id,
              title: sectionTitle,
              content,
            })
            .select("*")
            .single();

          if (sectionError) {
            console.error("Error inserting section:", sectionError);
            setIsCourseSaveComplete(false);
            throw new Error("Failed to insert section");
            // return new Response("Failed to insert section", { status: 500 });
          }

          console.log("Inserted course sections");

          for (const quiz of quizzes) {
            const { question, options, answer } = quiz;

            const { error: quizError } = await supabase
              .from("course_quizzes")
              .insert({
                section_id: insertedSection.id,
                question,
                options,
                answer,
              });

            if (quizError) {
              console.error("Error inserting quiz:", quizError);
              setIsCourseSaveComplete(false);
              throw new Error("Failed to insert quiz");
              // return new Response("Failed to insert quiz", { status: 500 });
            }

            console.log("Inserted course quiz");
          }
        }

        toast.success("Course generated successfully", {
          duration: 20000,
          position: "top-center",
          action: {
            label: "X",
            onClick: () => {},
          },
        });

        setIsCourseSaveComplete(false);
      } catch (error) {
        setIsCourseSaveComplete(false);
        toast.error((error as Error).message);
      }
    },
  });

  console.log({ isLoading });
  console.log(object);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    submit({
      courseTopic: values.courseTopic,
      difficultyLevel: values.difficultyLabel,
      targetAudience: values.targetAudience,
    });
  }

  const sectionCount = object ? (object.sections ?? []).length : 0;

  return (
    <PageContainer scrollable>
      <div className="space-y-8 mt-20">
        {(isLoading || isCourseSaveComplete) && (
          <Card className="max-w-lg mx-auto ">
            <CardContent className="p-6 bg-background/10">
              <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full flex justify-center items-center bg-sky-800 text-white dark:text-foreground text-lg font-bold">
                    {sectionCount}
                  </div>

                  <p className="font-semibold">
                    Course section{sectionCount > 1 ? "s" : ""} generated
                  </p>
                </div>
                <Loader2 className="animate-spin size-5" />
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="max-w-lg mx-auto ">
          <CardContent className="p-6 bg-background/10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="courseTopic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="eg: Html" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="difficultyLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advance">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="eg: Developers" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading || isCourseSaveComplete}
                  type="submit"
                  className="w-full flex gap-2 items-center"
                >
                  {isLoading || isCourseSaveComplete ? (
                    <>
                      {" "}
                      <Loader className="size-5 animate-spin" /> Generating
                      course{" "}
                    </>
                  ) : (
                    "Generate course"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Page;
