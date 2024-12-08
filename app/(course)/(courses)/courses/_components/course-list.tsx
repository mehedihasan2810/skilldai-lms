"use client";
import PageContainer from "@/components/dashboard/page-container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteCourse, getCourses } from "@/lib/db";
// import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { buttonVariants, Input } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { parseAsString, useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const CourseList =  ({email}: {email: string}) => {
  const router = useRouter();
  // const { session } = useSupabase();
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const {
    data: courses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => await getCourses(email ?? ""),
  });

  console.log({ courses });

  const searchedCourses = (courses || []).filter((c) => {
    if (searchTerm.trim()) {
      return (
        c.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        [
          c.title.toLocaleLowerCase(),
          c.difficulty.toLocaleLowerCase(),
          c.target_audience.toLocaleLowerCase(),
        ].includes(searchTerm.toLocaleLowerCase())
      );
    }

    return true;
  });

  const courseJsx = error ? (
    <p className="text-red-500">
      Unable to load the courses. Please try again by refreshing the page
    </p>
  ) : isLoading ? (
    Array.from({ length: 4 }).map((_, i) => (
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
  ) : searchedCourses.length === 0 ? (
    <div>
      It&#39;s not available, but you can create it.{" "}
      <Link href="/courses/create" className="text-primary underline">
        Create it from here
      </Link>
    </div>
  ) : (
    searchedCourses.map((course) => (
      <div
        key={course.id}
        className="bg-card text-card-foreground rounded-xl shadow border border-border/70 overflow-hidden group flex flex-col"
      >
        <div className="p-4 flex justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold grow">{course.title}</h2>
            <div className="mt-2 flex gap-2 flex-wrap">
              <Badge>{course.topic}</Badge> <Badge>{course.difficulty}</Badge>{" "}
              <Badge>{course.target_audience}</Badge>
            </div>
          </div>
          {/* <DeleteCourseDialog courseId={course.id} /> */}
        </div>
        <Separator className="" />
        <p className="text-muted-foreground p-4 grow">{course.description}</p>
        <div className="p-4 pt-0">
          <Link
            href={`/course/${course.id}`}
            // className="w-full flex items-center gap-2"
            className={buttonVariants({
              className: "w-full text-muted-foreground flex items-center gap-2",
            })}
          >
            Start learning
          </Link>
        </div>
      </div>
    ))
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-4 ">
        <h1 className="text-xl font-bold">Find your course</h1>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-80"
        />
      </div>
      <div
        className={cn(
          " pb-10",
          searchedCourses.length === 0
            ? ""
            : "grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
            isLoading && "grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
        )}
      >
        {courseJsx}
      </div>
    </>
  );
};


const DeleteCourseDialog = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const deleteChatMutation = useMutation({
    mutationFn: async ({ courseId }: { courseId: string }) =>
      await deleteCourse(courseId),
    onSuccess: async (deletedCourse) => {
      console.log({ deletedCourse });

      queryClient.invalidateQueries({ queryKey: ["courses"] });

      // queryClient.setQueryData<Chat[]>(["courses"], (oldCourses) => {
      //   return (oldCourses ?? []).filter(
      //     (course) => course.id !== deletedCourse.id
      //   );
      //   // return [...(oldCourses || []), newChat];
      // });

      toast.success("Deleted successfully");

      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={(v) => setIsDialogOpen(v)}>
      <AlertDialogTrigger
        onClick={(e) => e.stopPropagation()}
        className={buttonVariants({
          className: "size-6 px-2 py-1 shrink-0 invisible group-hover:visible",
          variant: "ghost",
          size: "icon",
        })}
      >
        <Trash className="size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteChatMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteChatMutation.isPending}
            className={buttonVariants({
              variant: "destructive",
              className: "flex gap-2 items-center",
            })}
            onClick={() => deleteChatMutation.mutate({ courseId })}
          >
            {deleteChatMutation.isPending && (
              <Loader className="size-5 animate-spin" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
