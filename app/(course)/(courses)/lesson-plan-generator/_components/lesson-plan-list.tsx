"use client";
import { buttonVariants } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { getLessonPlans } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export const LessonPlanList = ({ userId }: { userId: string }) => {
  const {
    data: lessonPlans,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["lessonPlans"],
    queryFn: async () => await getLessonPlans({ userId }),
  });
  return (
    <div className="mb-16 mt-16">
      <h2 className="text-xl font-semibold mb-2">
        Your recently generated lesson plans
      </h2>

      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lessonPlans?.length === 0 ? (
            <div>You haven&#39;t generated any lesson plans yet!</div>
          ) : (
            lessonPlans?.map((lessonPlan) => (
              <div
                className="border bg-card text-card-foreground p-4 rounded-md flex flex-col"
                key={"lessonPlan.id"}
              >
                <div className="grow">
                  <h3>{lessonPlan.title}</h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge>{lessonPlan.topic}</Badge>
                    {lessonPlan.grade_level && (
                      <Badge>{lessonPlan.grade_level}</Badge>
                    )}
                    {lessonPlan.duration && (
                      <Badge>{lessonPlan.duration}</Badge>
                    )}
                    {lessonPlan.style && <Badge>{lessonPlan.style}</Badge>}
                    {lessonPlan.focusing_on && (
                      <Badge>{lessonPlan.focusing_on}</Badge>
                    )}
                  </div>
                </div>

                <Link
                  className={buttonVariants({ className: "w-full mt-4" })}
                  href={`/lesson-plan-generator/${lessonPlan?.id}`}
                >
                  View Lesson Plan
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
