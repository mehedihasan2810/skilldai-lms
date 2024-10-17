"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CourseSidebarNav } from "@/components/sidebar-nav";
import { courseConfig, exampleCourse } from "@/config";
import Markdown from "@/components/markdown/markdown";
import { Separator } from "@/components/ui/separator";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getSectionsByCourseId } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, buttonVariants } from "@/components/ui";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DocPageProps {
  params: {
    courseSlug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function DocPage({ params, searchParams }: DocPageProps) {
  console.log({ searchParams });

  const {
    data: courseSections,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["sections", params.courseSlug],
    queryFn: async () => await getSectionsByCourseId(params.courseSlug),
  });

  console.log({ error });

  // console.log({ courseSections });

  const content = courseSections?.find(
    (course) => course.id === searchParams.section
  );

  const contentIndex = courseSections?.findIndex(
    (course) => course.id === searchParams.section
  );

  const sectionJsx = error ? (
    <p className="text-red-500">
      Unable to load the content. Please try again by refreshing page
    </p>
  ) : isLoading ? (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-5 max-w-[400px]" />
        <Skeleton className="h-5 max-w-[200px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 max-w-[600px]" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  ) : (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full flex justify-center items-center bg-sky-800 text-white dark:text-foreground text-xl font-bold">
            {contentIndex === -1 || contentIndex === undefined
              ? 1
              : contentIndex + 1}
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Chapter{" "}
              {contentIndex === -1 || contentIndex === undefined
                ? 1
                : contentIndex + 1}
            </p>
            <h1 className="text-lg font-bold">
              {(content ?? courseSections![0]).title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* <div className="text-right">
            <div>0%</div>
            <div className="text-sm text-muted-foreground">
              0/{courseSections?.length} chapters
            </div>
          </div>
          <div className="size-8">
            <CircularProgressbar value={50} strokeWidth={12} />
          </div> */}
        </div>
      </div>

      <Separator className="my-10" />

      <div className="mx-auto w-full min-w-0">
        <Markdown text={(content ?? courseSections![0]).content} />
      </div>

      {courseSections![
        contentIndex === -1 || contentIndex === undefined ? 1 : contentIndex + 1
      ] ? (
        <div className="border p-8 rounded-md text-center mt-20">
          <div className="text-muted-foreground">Next up</div>
          <div className="text-lg font-bold mb-3">
            {(contentIndex === -1 || contentIndex === undefined
              ? 1
              : contentIndex + 1) + 1}
            :{" "}
            {
              // content ??
              courseSections![
                contentIndex === -1 || contentIndex === undefined
                  ? 1
                  : contentIndex + 1
              ].title
            }
          </div>
          <Link
            href="#"
            className={buttonVariants({ className: "flex items-center gap-2" })}
          >
            Start Chapter{" "}
            {(contentIndex === -1 || contentIndex === undefined
              ? 1
              : contentIndex + 1) + 1}
            <ArrowRight />
          </Link>
        </div>
      ) : (
        <div className="border p-8 rounded-md text-center mt-20">
          <div className="size-fit mx-auto rounded-full flex justify-center items-center bg-sky-800 text-white dark:text-foreground p-4">
            <Check className="size-10" />
          </div>
          <p className="text-lg mt-4">Congratulations! You have completed the course.</p>
        </div>
      )}
    </>
  );

  return (
    <>
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full py-6 pr-6 lg:py-8">
          {error ? (
            <div></div>
          ) : isLoading ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <Skeleton className="h-3 max-w-[200px]" />
                <Skeleton className="h-4" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 max-w-[200px]" />
                <Skeleton className="h-4" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 max-w-[200px]" />
                <Skeleton className="h-4" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 max-w-[200px]" />
                <Skeleton className="h-4" />
              </div>
            </div>
          ) : (
            <CourseSidebarNav
              courseId={params.courseSlug}
              courseSections={courseSections!}
              config={courseConfig}
              currentSectionId={searchParams.section ?? courseSections![0].id}
            />
          )}
        </ScrollArea>
      </aside>
      <main
        className="relative py-6 lg:py-8 px-4"
        // className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
      >
        {sectionJsx}
      </main>
    </>
  );
}
