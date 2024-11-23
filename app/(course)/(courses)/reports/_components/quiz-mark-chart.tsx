"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressbar } from "react-circular-progressbar";
// import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getCoursesForReports } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleHelp } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export function QuizMarkChart({userId}: {userId: string}) {
  // const { session, supabase } = useSupabase();
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
      const result = section.quizzes_result[userId ?? ""];
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
  //     const result = section.quizzes_result[userId ?? ""] ?? {};
  //     console.log({ result });
  //     const quiz = section.course_quizzes.filter((quiz) =>
  //       result[quiz.id] ? true : false
  //     );
  //     console.log({ quiz });
  //     // console.log(
  //     //   section.course_quizzes.find(
  //     //     (quiz) => section.quizzes_result[userId ?? ""]
  //     //   )
  //     // );
  //     // if() {

  //     // }
  //   });
  // );

  const totalQuizzes = (courses || [])
    .flatMap((course) => course.course_sections)
    .flatMap((section) => section.course_quizzes).length;

  const completedQuizzes = (courses ?? [])
    .flatMap((course) => course.course_sections)
    .reduce((total, section) => {
      if (section.quizzes_result[userId ?? ""]) {
        const totalQuiz =
          Object.keys(section.quizzes_result[userId ?? ""]).length -
          1;
        return total + totalQuiz;
      }

      return total;
    }, 0);

  const completeQuizzes = (courses || [])
    .flatMap((course) => course.course_sections)
    .reduce((total, section) => {
      if (section.quizzes_result[userId ?? ""]) {
        const totalQuiz =
          Object.keys(section.quizzes_result[userId ?? ""]).length -
          1;
        return total + totalQuiz;
      }

      return total;
    }, 0);

  const incompleteQuizzes = totalQuizzes - completeQuizzes;
  // (courses || [])
  //   .flatMap((course) => course.course_sections)
  //   .reduce((total, section) => {
  //     if (section.quizzes_result[userId ?? ""]) {
  //       const totalQuiz =
  //         Object.keys(section.quizzes_result[userId ?? ""]).length -
  //         1;
  //       return total + totalQuiz;
  //     }

  //     return total;
  //   }, 0);

  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2">
          Quiz Mark{" "}
          <HoverCard>
            <HoverCardTrigger
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
                className: "h-8 w-8  text-muted-foreground",
              })}
            >
              <CircleHelp className="size-5" />
            </HoverCardTrigger>
            <HoverCardContent className="text-sm">
              All the quizzes given have been shown with their average marks in
              percentage.
            </HoverCardContent>
          </HoverCard>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-left">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4">
          <div className="size-60 self-center lg:justify-self-center">
            <CircularProgressbar
              text={`${
                Math.ceil((correctQuizzes.length / completedQuizzes) * 100) || 0
              }%`}
              className="size-full"
              value={
                Math.ceil((correctQuizzes.length / completedQuizzes) * 100) || 0
              }
              strokeWidth={12}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="size-5 rounded-full bg-cyan-700"></div>

              <div>
                <div>Complete Quiz</div>

                {error ? (
                  <div>{error.message}</div>
                ) : isLoading ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  <div> {completeQuizzes}</div>
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
                  <div> {incompleteQuizzes}</div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-5 rounded-full bg-primary"></div>

              <div>
                <div>Correct Quiz</div>
                {error ? (
                  <div>{error.message}</div>
                ) : isLoading ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  <div> {correctQuizzes.length}</div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-5 rounded-full bg-red-700"></div>

              <div>
                <div>Incorrect Quiz</div>
                {error ? (
                  <div>{error.message}</div>
                ) : isLoading ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  <div> {completeQuizzes - correctQuizzes.length}</div>
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
                  <div> {totalQuizzes}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
