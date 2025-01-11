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
import { getLessonPlan, saveLessonPlan, saveWorksheets } from "@/lib/db";
import { reportErrorAction } from "@/actions/report-error-via-mail";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { questionsSchema } from "@/lib/schemas";
import { generateQuizTitle } from "@/actions/generate-quiz-title";
import { Progress } from "@/components/ui/progress";

const outputSchema = z.object({
  title: z.string().describe("A max eight-word title for the worksheets."),
  worksheets: z.string().describe("The worksheets content for the teachers."),
});

export const formSchema = z.object({
  subject: z.string().trim().min(1, { message: "Required" }),
  chapter: z.string().trim().min(1, { message: "Required" }),
  grade: z.string().trim().min(1, { message: "Required" }),
  difficulty: z.coerce.number().max(10, { message: "Required" }),
  numOfQuestions: z.string().trim().min(1, { message: "Required" }),
  source: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Please select at least one source.",
  }),
});

export const QuizPage = ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const queryClient = useQueryClient();

  const [isQuizSaving, setIsQuizSaving] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      chapter: "",
      grade: "",
      difficulty: 5,
      numOfQuestions: "10",
      source: ["Exam Questions", "Teacher Questions"],
    },
  });

  const {
    submit,
    object: partialQuestions,
    isLoading,
  } = useObject({
    api: "/api/generate-quiz",
    schema: questionsSchema,
    initialValue: undefined,
    onError: (quizGenerateError) => {
      console.log({ quizGenerateError });
      toast.error(
        quizGenerateError.message.trim() ||
          "Failed to generate quiz. Please try again."
      );
      reportErrorAction({
        userEmail,
        errorMessage: quizGenerateError.message,
        errorTrace: `[CreateQuizPanel] [useObject] [onError] [app/%28tools-n-course%29/%28tools%29/quiz-generator/_components/quiz-page.tsx]`,
        errorSourceUrl: "/quiz-from-doc",
      });
    },
    onFinish: async ({ object }) => {
      console.log({ object });

      // return;
      try {
        if (!object) {
          throw new Error("No quizzes generated! Please try again.");
        }

        const res = questionsSchema.safeParse(object);
        if (res.error) {
          throw new Error(res.error.errors.map((e) => e.message).join("\n"));
        }

        setIsQuizSaving(true);

        const supabase = createClient();

        const generatedTitle = await generateQuizTitle(form.watch("subject"));

        // console.log({ generatedTitle });

        // setTitle(generatedTitle);

        // const { data: fileSaveRes, error: fileSaveErr } = await supabase.storage
        //   .from("quiz-from-doc")
        //   .upload(
        //     `${userId}/${files[0].name
        //       .replace(".pdf", "")
        //       .replaceAll(" ", "-")}-${shortUid.rnd()}.pdf`,
        //     files[0]
        //   );

        // console.log({ fileSaveRes, fileSaveErr });

        // const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileSaveRes?.fullPath}`;

        // console.log({ fileUrl });

        const { error: quizError, data: quizData } = await supabase
          .from("qfd_quiz")
          .insert({
            title: generatedTitle,
            user_id: userId,
            file_name: "",
            file_url: "",
            // file_url: fileSaveRes ? fileUrl : "",
            correct_answers: [],
          })
          .select("id")
          .single();

        if (quizError) {
          console.log({ quizError });
          throw new Error(quizError.message);
        }
        console.log({ quizData });

        const questions = object.map((q) => ({
          quiz_id: quizData?.id,
          question: q.question,
          answer: q.answer,
          options: q.options,
        }));

        const { error: questionError, data: quizQuestions } = await supabase
          .from("qfd_questions")
          .insert(questions)
          .select("id");

        if (questionError) {
          console.log({ questionError });
          throw new Error(questionError.message);
        }

        console.log({ quizQuestions });

        setIsQuizSaving(false);
        // setQuestions(object ?? []);

        router.push(`/quiz-generator/${quizData.id}`);
      } catch (error) {
        console.log({ error });
        setIsQuizSaving(false);
        toast.error((error as Error).message);
        reportErrorAction({
          userEmail,
          errorMessage: (error as Error).message,
          errorTrace: `[CreateQuizPanel] [useObject] [onFinish] [app/%28tools-n-course%29/%28tools%29/quiz-generator/_components/quiz-page.tsx]`,
          errorSourceUrl: "/quiz-from-doc",
        });
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    submit({ ...values, userId, userEmail });
  };

  const progress = partialQuestions
    ? (partialQuestions.length / +form.watch("numOfQuestions")) * 100
    : 0;

  return (
    <Card className="max-w-4xl mx-auto w-full mt-10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Quiz Generator</CardTitle>
        <CardDescription>Generate quizzes on any subject</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.label} value={subject.label}>
                            {subject.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chapter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter name</FormLabel>

                    <FormControl>
                      <Input placeholder="Enter chapter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {grades.map((grade) => (
                          <SelectItem key={grade.name} value={grade.name}>
                            {grade.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>

                  <FormControl>
                    <div>
                      <Slider
                        defaultValue={[field.value]}
                        onChange={field.onChange}
                        max={10}
                        step={1}
                      />
                      <div className="grid grid-cols-3 mt-2 text-xs text-muted-foreground">
                        <div className="justify-self-start">Easy</div>
                        <div className="justify-self-center">Medium</div>
                        <div className="justify-self-end">Hard</div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numOfQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of questions" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <SelectItem key={i + 1} value={`${i + 1}`}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Sources</FormLabel>
                  </div>
                  {sources.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="source"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            {(isLoading || isQuizSaving) && (
              <div className="flex flex-col space-y-4">
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="w-full space-y-2">
                  <div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isLoading
                          ? "bg-yellow-500/50 animate-pulse"
                          : "bg-muted"
                      }`}
                    />
                    <span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
                      {partialQuestions
                        ? `Generating question ${partialQuestions.length} of ${form.watch("numOfQuestions")}`
                        : "Analyzing"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              disabled={isLoading || isQuizSaving}
              type="submit"
              className="w-full flex items-center gap-2"
            >
              {(isLoading || isQuizSaving) && (
                <Loader className="animate-spin size-5" />
              )}
              Generate
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const subjects = [
  {
    label: "Geography",
  },
  {
    label: "Mathematics",
  },
  {
    label: "Sociology",
  },
  {
    label: "Physics",
  },
  {
    label: "Chemistry",
  },
  {
    label: "History",
  },
  {
    label: "Sciences",
  },
  {
    label: "Biology",
  },
  {
    label: "English",
  },
  {
    label: "Physical Education",
  },
  {
    label: "Spanish",
  },
  {
    label: "Philosophy",
  },
  {
    label: "Arts",
  },
  {
    label: "Economics",
  },
  {
    label: "Environmental Sciences",
  },
];

const grades = [
  {
    name: "1st grade",
  },
  {
    name: "2nd grade",
  },
  {
    name: "3rd grade",
  },
  {
    name: "4th grade",
  },
  {
    name: "5th grade",
  },
  {
    name: "6th grade",
  },
  {
    name: "7th grade",
  },
  {
    name: "8th grade",
  },
  {
    name: "9th grade",
  },
  {
    name: "10th grade",
  },
  {
    name: "11th grade",
  },
  {
    name: "12th grade",
  },
  {
    name: "Preschool",
  },
  {
    name: "University",
  },
];

const sources = [
  {
    id: "Exam Questions",
    label: "Exam Questions",
  },
  {
    id: "Teacher Questions",
    label: "Teacher Questions",
  },
] as const;
