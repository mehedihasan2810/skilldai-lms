"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircularProgressbar } from "react-circular-progressbar";
import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getCoursesForReports } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A radial chart with text";

export function QuizMarkChart() {
  const { session, supabase } = useSupabase();
  const {
    data: courses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["coursesReports"],
    queryFn: async () => await getCoursesForReports(),
  });

  const result = courses
    ?.flatMap((course) => course.course_sections)
    .map((section) => {
      const result = section.quizzes_result[session?.user.id ?? ""];
      if (result) {
        return result;
      }
    })
    .filter((a) => !!a);

  const quizzes = courses
    ?.flatMap((course) => course.course_sections)
    .flatMap((section) => section.course_quizzes);

  const correctQuizzes = (quizzes ?? []).filter((quiz) => {
    const isCorrect = (result ?? []).find((r) => {
      const currentResult = (r ?? {})[quiz.id];

      if (currentResult) {
        return currentResult.includes(quiz.answer);
      }
      return false;
    });
    return isCorrect ? true : false;
  });

  console.log({ correctQuizzes });

  // console.log(
  // courses
  //   ?.flatMap((course) => course.course_sections)
  //   .filter((section) => {
  //     const result = section.quizzes_result[session?.user.id ?? ""] ?? {};
  //     console.log({ result });
  //     const quiz = section.course_quizzes.filter((quiz) =>
  //       result[quiz.id] ? true : false
  //     );
  //     console.log({ quiz });
  //     // console.log(
  //     //   section.course_quizzes.find(
  //     //     (quiz) => section.quizzes_result[session?.user.id ?? ""]
  //     //   )
  //     // );
  //     // if() {

  //     // }
  //   });
  // );

  const completedQuizzes = (courses ?? [])
    .flatMap((course) => course.course_sections)
    .reduce((total, section) => {
      if (section.quizzes_result[session?.user.id ?? ""]) {
        const totalQuiz =
          Object.keys(section.quizzes_result[session?.user.id ?? ""]).length -
          1;
        return total + totalQuiz;
      }

      return total;
    }, 0);

  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle>Quiz Mark</CardTitle>
      </CardHeader>
      <CardContent className="text-left">
        <div className="grid grid-cols-2 gap-6">
          <CircularProgressbar
            text={`${Math.ceil(
              (correctQuizzes.length / completedQuizzes) * 100
            ) || 0}%`}
            className="size-52 aspect-square w-fit shrink"
            value={Math.ceil((correctQuizzes.length / completedQuizzes) * 100) || 0}
            strokeWidth={12}
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="size-5 rounded-full bg-cyan-700"></div>

              <div>
                <div>Completed Quiz</div>

                {error ? (
                  <div>{error.message}</div>
                ) : isLoading ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  <div>
                    {" "}
                    {courses!
                      .flatMap((course) => course.course_sections)
                      .reduce((total, section) => {
                        if (section.quizzes_result[session?.user.id ?? ""]) {
                          const totalQuiz =
                            Object.keys(
                              section.quizzes_result[session?.user.id ?? ""]
                            ).length - 1;
                          return total + totalQuiz;
                        }

                        return total;
                      }, 0)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-5 rounded-full bg-yellow-600"></div>

              <div>
                <div>Incomplete Quiz</div>
                {error ? (
                  <div>{error.message}</div>
                ) : isLoading ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  <div>
                    {" "}
                    {courses!
                      .flatMap((course) => course.course_sections)
                      .flatMap((section) => section.course_quizzes).length -
                      courses!
                        .flatMap((course) => course.course_sections)
                        .reduce((total, section) => {
                          if (section.quizzes_result[session?.user.id ?? ""]) {
                            const totalQuiz =
                              Object.keys(
                                section.quizzes_result[session?.user.id ?? ""]
                              ).length - 1;
                            return total + totalQuiz;
                          }

                          return total;
                        }, 0)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-5 rounded-full bg-white"></div>

              <div>
                <div>Total Quiz</div>
                {error ? (
                  <div>{error.message}</div>
                ) : isLoading ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  <div>
                    {" "}
                    {
                      courses!
                        .flatMap((course) => course.course_sections)
                        .flatMap((section) => section.course_quizzes).length
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// {
//   "8fc4f0b7-be85-4b2f-995f-9820cf70a8da": {
//     "isChecked": true,
//     "401e72e3-3733-4a5a-8f43-a18a07e3f965": [
//       "401e72e3-3733-4a5a-8f43-a18a07e3f965",
//       "16-bit"
//     ],
//     "36f4f222-a2ae-4379-b7d4-1d1a966438f2": [
//       "36f4f222-a2ae-4379-b7d4-1d1a966438f2",
//       "AX"
//     ],
//     "786b1f58-b2b5-401b-829e-d014966a4f65": [
//       "786b1f58-b2b5-401b-829e-d014966a4f65",
//       "64KB"
//     ]
//   }
// }
