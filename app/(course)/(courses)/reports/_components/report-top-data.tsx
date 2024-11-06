"use client";
import React from "react";
import {
  Book,
  Flag,
  GraduationCap,
  ShieldQuestion,
  Trophy,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCourses, getCoursesForReports } from "@/lib/db";
import { useSupabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

export const ReportTopData = () => {
  const { session } = useSupabase();
  const {
    data: courses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["coursesReports"],
    queryFn: async () => await getCoursesForReports(),
  });

  //   console.log({ courses });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      <div className="flex gap-3 items-center shadow rounded-md border bg-card  p-4 ">
        <div className="size-14 rounded-full p-3 bg-primary/20 text-primary">
          <GraduationCap className="size-full" />
        </div>

        {error ? (
          <p>Error:{error.message}</p>
        ) : isLoading ? (
          <div className="space-y-2">
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-28 h-4" />
          </div>
        ) : (
          <div>
            <div className="font-bold text-lg">{courses!.length}</div>
            <p className="text-muted-foreground">Total Courses</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 items-center shadow rounded-md border bg-card  p-4 ">
        <div className="size-14 rounded-full p-3 bg-primary/20 text-primary">
          <Trophy className="size-full" />
        </div>

        {error ? (
          <p>Error:{error.message}</p>
        ) : isLoading ? (
          <div className="space-y-2">
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-28 h-4" />
          </div>
        ) : (
          <div className="">
            <div className="font-bold text-lg">
              {" "}
              {
                courses!.filter((c) =>
                  c.completed_users.includes(session?.user.id)
                ).length
              }
            </div>
            <p className="text-muted-foreground">Completed Courses</p>
          </div>
        )}
      </div>
      <div className="flex gap-3 items-center shadow rounded-md border bg-card  p-4 ">
        <div className="size-14 rounded-full p-3 bg-primary/20 text-primary">
          <Flag className="size-full" />
        </div>

        {error ? (
          <p>Error:{error.message}</p>
        ) : isLoading ? (
          <div className="space-y-2">
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-28 h-4" />
          </div>
        ) : (
          <div className="">
            <div className="font-bold text-lg">
              {
                courses!.filter((c) =>
                  c.in_progress_users.includes(session?.user.id)
                ).length
              }
            </div>
            <p className="text-muted-foreground">In Progress Courses</p>
          </div>
        )}
      </div>
      <div className="flex gap-3 items-center shadow rounded-md border bg-card  p-4 ">
        <div className="size-14 rounded-full p-3 bg-primary/20 text-primary">
          <ShieldQuestion className="size-full" />
        </div>

        {error ? (
          <p>Error:{error.message}</p>
        ) : isLoading ? (
          <div className="space-y-2">
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-28 h-4" />
          </div>
        ) : (
          <div className="">
            <div className="font-bold text-lg">
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
            <p className="text-muted-foreground">Quizzes Taken</p>
          </div>
        )}
      </div>
    </div>
  );
};
