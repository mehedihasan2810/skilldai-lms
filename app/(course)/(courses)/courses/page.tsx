"use client";
import PageContainer from "@/components/dashboard/page-container";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourses } from "@/lib/db";
import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { session } = useSupabase();

  const {
    data: courses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => await getCourses(session?.user.email ?? ""),
  });

  console.log({ courses });

  const courseJsx = error ? (
    <p className="text-red-500">
      Unable to load the courses. Please try again by refreshing the page
    </p>
  ) : isLoading ? (
    Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="border p-4 rounded-md bg-primary/5 ">
        <Skeleton className="w-[80%] h-[20px] rounded-md" />

        <div className="mt-3 space-y-2">
          <Skeleton className="h-[14px] rounded-md" />
          <Skeleton className="h-[14px] rounded-md" />
          <Skeleton className="h-[14px] rounded-md" />
          <Skeleton className="h-[14px] rounded-md" />
          <Skeleton className="h-[14px] rounded-md" />
          <Skeleton className="h-[14px] rounded-md" />
        </div>
      </div>
    ))
  ) : (
    courses!.map((course, i) => (
      <Link
        href={`/course/${course.id}`}
        key={course.id}
        className="p-4 transition-colors bg-primary/5 hover:bg-primary/10 text-secondary-foreground space-y-3 rounded-md shadow border"
      >
        <h2 className="text-xl">{course.title}</h2>
        <p className="text-muted-foreground">{course.description}</p>
      </Link>
    ))
  );

  return (
    <PageContainer scrollable>
      <h1 className="mb-4 mt-4 text-xl font-bold">Find your course</h1>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {courseJsx}
      </div>
    </PageContainer>
  );
};

export default Page;
