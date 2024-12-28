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
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQuery } from "@tanstack/react-query";
// import { useSupabase } from "@/lib/supabase";
import { getCourses, getCoursesForReports } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A radial chart with text";

export function CourseCompletionChart({userId}: {userId: string}) {
  // const { session } = useSupabase();
  const {
    data: courses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["coursesReports"],
    queryFn: async () => await getCoursesForReports(),
  });

  return (
    <Card className="flex flex-col gap-8 justify-center">
      <CardHeader className="">
        <CardTitle>Course Completion Status</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-16">
        <div className="flex items-center gap-4">
          <div className="size-20">
            <CircularProgressbar
              text={`${
                Math.ceil(
                  ((courses ?? []).filter((c) =>
                    c.completed_users.includes(userId)
                  ).length /
                    (courses ?? []).length) *
                    100
                ) || 0
              }%`}
              className="size-full"
              value={
                Math.ceil(
                  ((courses ?? []).filter((c) =>
                    c.completed_users.includes(userId)
                  ).length /
                    (courses ?? []).length) *
                    100
                ) || 0
              }
              strokeWidth={12}
            />
          </div>

          {error ? (
            <p>Error:{error.message}</p>
          ) : isLoading ? (
            <div className="space-y-2">
              <Skeleton className="w-10 h-4" />
              <Skeleton className="w-28 h-4" />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="font-bold  text-xl">
                {
                  courses!.filter((c) =>
                    c.completed_users.includes(userId)
                  ).length
                }
              </div>
              <div className="">Completed</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="size-20">
            <CircularProgressbar
              text={`${
                Math.ceil(
                  ((courses ?? []).filter((c) =>
                    c.in_progress_users.includes(userId)
                  ).length /
                    (courses ?? []).length) *
                    100
                ) || 0
              }%`}
              className="size-20"
              value={
                Math.ceil(
                  ((courses ?? []).filter((c) =>
                    c.in_progress_users.includes(userId)
                  ).length /
                    (courses ?? []).length) *
                    100
                ) || 0
              }
              strokeWidth={12}
            />
          </div>
          {error ? (
            <p>Error:{error.message}</p>
          ) : isLoading ? (
            <div className="space-y-2">
              <Skeleton className="w-10 h-4" />
              <Skeleton className="w-28 h-4" />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="font-bold  text-xl">
                {" "}
                {
                  courses!.filter((c) =>
                    c.in_progress_users.includes(userId)
                  ).length
                }
              </div>
              <div className="w-max">In Progress</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="size-20">
            <CircularProgressbar
              text={`${
                Math.ceil(
                  (((courses ?? []).filter((c) =>
                    c.in_progress_users.includes(userId)
                  ).length +
                    (courses ?? []).filter((c) =>
                      c.completed_users.includes(userId)
                    ).length) /
                    (courses ?? []).length) *
                    100
                ) || 0
              }%`}
              // text={`${Math.ceil(
              //   ((courses ?? []).filter((c) => c.not_started_users.length === 0)
              //     .length /
              //     (courses ?? []).length) *
              //     100
              // )}%`}
              className="size-20"
              value={
                Math.ceil(
                  (((courses ?? []).filter((c) =>
                    c.in_progress_users.includes(userId)
                  ).length +
                    (courses ?? []).filter((c) =>
                      c.completed_users.includes(userId)
                    ).length) /
                    (courses ?? []).length) *
                    100
                ) || 0
              }
              // value={Math.ceil(
              //   ((courses ?? []).filter((c) => c.not_started_users.length === 0)
              //     .length /
              //     (courses ?? []).length) *
              //     100
              // )}
              strokeWidth={12}
            />
          </div>

          {error ? (
            <p>Error:{error.message}</p>
          ) : isLoading ? (
            <div className="space-y-2">
              <Skeleton className="w-10 h-4" />
              <Skeleton className="w-28 h-4" />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="font-bold  text-xl">
                {(courses ?? []).length -
                  ((courses ?? []).filter((c) =>
                    c.in_progress_users.includes(userId)
                  ).length +
                    (courses ?? []).filter((c) =>
                      c.completed_users.includes(userId)
                    ).length)}
              </div>
              <div className="w-max">Not Started</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
