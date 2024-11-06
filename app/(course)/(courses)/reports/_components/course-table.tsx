"use client";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCourses, getCoursesForReports } from "@/lib/db";
import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const CourseTable = () => {
  const { session } = useSupabase();
  const {
    data: courses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["coursesReports"],
    queryFn: async () => await getCoursesForReports(),
  });

  console.log({ courses });

  return (
    <Table className="border">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="">Course</TableHead>
          <TableHead>Lesson</TableHead>
          <TableHead>Quiz</TableHead>
          <TableHead className="">Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {error ? (
          <TableRow>
            <TableCell className="font-medium">
              Error: {error.message}
            </TableCell>
            <TableCell>Error</TableCell>
            <TableCell>Error</TableCell>
            <TableCell className="flex gap-4 items-center">Error</TableCell>
          </TableRow>
        ) : isLoading ? (
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-10" />
            </TableCell>
            <TableCell>
              {" "}
              <Skeleton className="h-4 w-10" />
            </TableCell>
            <TableCell className="flex gap-4 items-center">
              <Skeleton className="h-4 w-32" />
            </TableCell>
          </TableRow>
        ) : (
          courses!.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">
                <Link
                  className="hover:text-primary hover:underline"
                  href={`/course/${course.id}`}
                >
                  {course.title}
                </Link>
              </TableCell>
              <TableCell>
                {
                  course.course_sections.filter((section) =>
                    section.completed_users.includes(session?.user.id ?? "")
                  ).length
                }
                /{course.course_sections.length}
              </TableCell>
              <TableCell>
                {course.course_sections.reduce((total, section) => {
                  if (section.quizzes_result[session?.user.id ?? ""]) {
                    const totalQuiz =
                      Object.keys(
                        section.quizzes_result[session?.user.id ?? ""]
                      ).length - 1;
                    return total + totalQuiz;
                  }

                  return total;
                }, 0)}
                /
                {course.course_sections.reduce(
                  (total, section) => total + section.course_quizzes.length,
                  0
                )}
              </TableCell>
              <TableCell className="flex gap-4 items-center">
                <Progress
                  className="min-w-16 md:min-w-auto"
                  value={Math.ceil(
                    (course.course_sections.filter((section) =>
                      section.completed_users.includes(session?.user.id ?? "")
                    ).length /
                      course.course_sections.length) *
                      100
                  )}
                />{" "}
                <div>
                  {Math.ceil(
                    (course.course_sections.filter((section) =>
                      section.completed_users.includes(session?.user.id ?? "")
                    ).length /
                      course.course_sections.length) *
                      100
                  )}
                  %
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CourseTable;
