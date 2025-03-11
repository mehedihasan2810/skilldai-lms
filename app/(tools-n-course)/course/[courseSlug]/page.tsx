// "use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CourseSidebarNav } from "@/components/sidebar-nav";
import { courseConfig } from "@/config";
import Markdown from "@/components/markdown/markdown";
import { Separator } from "@/components/ui/separator";
import "react-circular-progressbar/dist/styles.css";
import {
  getSectionsByCourseId,
  updateCourseStatusInprogress,
  updateSectionCompletion,
} from "@/lib/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui";
import { ArrowRight, Check, Loader, ShieldQuestion } from "lucide-react";
import { Quizzes } from "../_components/quizzes";
// import { useSupabase } from "@/lib/supabase";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { SectionProgress } from "../_components/section-progress";
import { useEffect } from "react";
import { CoursePage } from "../_components/course-page";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: {
    courseSlug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  // console.log({ searchParams });

  // const queryClient = useQueryClient();

  // const router = useRouter();

  // const { session } = useSupabase();

  // const updateCourseStatusMutation = useMutation({
  //   mutationFn: async ({
  //     courseId,
  //     status,
  //   }: {
  //     courseId: string;
  //     status: string;
  //   }) =>
  //     await updateCourseStatusInprogress(
  //       courseId,
  //       status,
  //       session?.user.id ?? ""
  //     ),
  // });

  // // console.log({ session });
  // const {
  //   data: courseSections,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["sections", params.courseSlug],
  //   queryFn: async () => await getSectionsByCourseId(params.courseSlug),
  // });

  // // console.log({ courseSections, error });

  // const updateSectionCompletionMutation = useMutation({
  //   mutationFn: async ({
  //     userId,
  //     sectionId,
  //     completedUsers,
  //     isMarkComplete,
  //     courseId,
  //   }: {
  //     userId: string;
  //     sectionId: string;
  //     completedUsers: string[];
  //     isMarkComplete: boolean;
  //     courseId: string;
  //   }) =>
  //     await updateSectionCompletion(
  //       userId,
  //       sectionId,
  //       completedUsers,
  //       isMarkComplete,
  //       courseId
  //     ),
  // });

  // const content = courseSections?.find(
  //   (course) => course.id === searchParams.section
  // );

  // const contentIndex = courseSections?.findIndex(
  //   (course) => course.id === searchParams.section
  // );

  // useEffect(() => {
  //   updateCourseStatusMutation.mutate(
  //     {
  //       status: "In progress",
  //       courseId: params.courseSlug,
  //     },
  //     {
  //       onSuccess: async (updatedStatus) => {
  //         console.log({ updatedStatus });
  //         await queryClient.invalidateQueries({ queryKey: ["courses"] });
  //         await queryClient.invalidateQueries({ queryKey: ["coursesReports"] });
  //       },
  //       onError: (updateStatusErr) => {
  //         console.log({ updateStatusErr });
  //         // toast.error(updateStatusErr.message);
  //       },
  //     }
  //   );
  // }, []);

  // const sectionJsx = error ? (
  //   <p className="text-red-500">
  //     Unable to load the content. Please try again by refreshing page
  //   </p>
  // ) : isLoading ? (
  //   <div className="space-y-8">
  //     <div className="space-y-2">
  //       <Skeleton className="h-5 max-w-[400px]" />
  //       <Skeleton className="h-5 max-w-[200px]" />
  //     </div>
  //     <div className="space-y-2">
  //       <Skeleton className="h-5 max-w-[600px]" />
  //       <Skeleton className="h-4" />
  //       <Skeleton className="h-4" />
  //       <Skeleton className="h-4" />
  //       <Skeleton className="h-4" />
  //       <Skeleton className="h-4" />
  //       <Skeleton className="h-4" />
  //     </div>
  //   </div>
  // ) : (
  //   <>
  //     <div className="flex justify-between items-center">
  //       <div className="flex items-center gap-4">
  //         <div className="shrink-0 size-12 rounded-full flex justify-center items-center bg-sky-800 text-white dark:text-foreground text-xl font-bold">
  //           {contentIndex === -1 || contentIndex === undefined
  //             ? 1
  //             : contentIndex + 1}
  //         </div>
  //         <div className="space-y-1">
  //           <p className="text-sm text-muted-foreground">
  //             Chapter{" "}
  //             {contentIndex === -1 || contentIndex === undefined
  //               ? 1
  //               : contentIndex + 1}
  //           </p>
  //           <h1 className="text-lg font-bold">
  //             {(content ?? courseSections![0]).title}
  //           </h1>
  //         </div>
  //       </div>

  //       <SectionProgress
  //         sectionsLength={courseSections?.length ?? 0}
  //         userId={session?.user.id ?? ""}
  //         completedSections={
  //           courseSections?.filter((section) =>
  //             section.completed_users.includes(session?.user.id ?? "")
  //           ).length ?? 0
  //         }
  //       />
  //     </div>

  //     <Separator className="my-10" />

  //     <div className="mx-auto w-full min-w-0">
  //       <Markdown text={(content ?? courseSections![0]).content} />
  //     </div>

  //     <div className="mt-20">
  //       <div className="text-center space-y-3 mb-10">
  //         <div className="size-fit mx-auto rounded-full flex justify-center items-center bg-sky-800 text-white dark:text-foreground p-4">
  //           <ShieldQuestion className="size-7" />
  //         </div>

  //         <p>It’s time to take a quiz!</p>
  //         <p className="text-muted-foreground">
  //           Test your knowledge and see what you’ve just learned.
  //         </p>
  //       </div>

  //       <Quizzes
  //         quizzes={(content ?? courseSections![0]).course_quizzes}
  //         quizzesResult={(content ?? courseSections![0]).quizzes_result}
  //         userId={session?.user.id ?? ""}
  //         sectionId={(content ?? courseSections![0]).id}
  //         completedUsers={(content ?? courseSections![0]).completed_users}
  //         courseSlug={params.courseSlug ?? ""}
  //       />
  //     </div>

  //     {courseSections![
  //       contentIndex === -1 || contentIndex === undefined ? 1 : contentIndex + 1
  //     ] ? (
  //       <div className="border p-8 rounded-md text-center mt-20 mb-10">
  //         <div className="text-muted-foreground">Next up</div>
  //         <div className="text-lg font-bold mb-3">
  //           {(contentIndex === -1 || contentIndex === undefined
  //             ? 1
  //             : contentIndex + 1) + 1}
  //           :{" "}
  //           {
  //             // content ??
  //             courseSections![
  //               contentIndex === -1 || contentIndex === undefined
  //                 ? 1
  //                 : contentIndex + 1
  //             ].title
  //           }
  //         </div>
  //         <Button
  //           onClick={() => {
  //             const isUserExists = (
  //               content ?? courseSections![0]
  //             ).completed_users.includes(session?.user.id ?? "");
  //             if (isUserExists) {
  //               router.push(
  //                 `/course/${params.courseSlug}/?section=${
  //                   courseSections![
  //                     contentIndex === -1 || contentIndex === undefined
  //                       ? 1
  //                       : contentIndex + 1
  //                   ].id
  //                 }`
  //               );
  //             } else {
  //               updateSectionCompletionMutation.mutate(
  //                 {
  //                   // userId: "",
  //                   userId: session?.user.id ?? "",
  //                   sectionId: (content ?? courseSections![0]).id,
  //                   completedUsers: (content ?? courseSections![0])
  //                     .completed_users,
  //                   isMarkComplete: false,
  //                   courseId: params.courseSlug,
  //                 },
  //                 {
  //                   onSuccess: async (updatedSectionCompletedUsers) => {
  //                     console.log({ updatedSectionCompletedUsers });

  //                     await queryClient.invalidateQueries({
  //                       queryKey: ["sections", params.courseSlug],
  //                     });

  //                     router.push(
  //                       `/course/${params.courseSlug}/?section=${
  //                         courseSections![
  //                           contentIndex === -1 || contentIndex === undefined
  //                             ? 1
  //                             : contentIndex + 1
  //                         ].id
  //                       }`
  //                     );
  //                   },
  //                   onError: (error) => {
  //                     toast.error(error.message);
  //                   },
  //                 }
  //               );
  //             }
  //           }}
  //           disabled={updateSectionCompletionMutation.isPending}
  //           className="flex items-center gap-2 mx-auto"
  //         >
  //           Start Chapter{" "}
  //           {(contentIndex === -1 || contentIndex === undefined
  //             ? 1
  //             : contentIndex + 1) + 1}
  //           {updateSectionCompletionMutation.isPending ? (
  //             <Loader className="animate-spin" />
  //           ) : (
  //             <ArrowRight />
  //           )}
  //         </Button>
  //       </div>
  //     ) : (
  //       <>
  //         {courseSections?.filter((section) =>
  //           section.completed_users.includes(session?.user.id ?? "")
  //         ).length === courseSections?.length ? (
  //           <div className="border p-8 rounded-md text-center mt-20 mb-10">
  //             <div className="size-fit mx-auto rounded-full flex justify-center items-center bg-sky-800 text-white dark:text-foreground p-4">
  //               <Check className="size-10" />
  //             </div>
  //             <p className="text-lg mt-4">
  //               Congratulations! You have completed the course.
  //             </p>
  //           </div>
  //         ) : (
  //           <div className="border p-8 rounded-md text-center mt-20 mb-10">
  //             <Button
  //               onClick={() => {
  //                 console.log(
  //                   courseSections?.filter((section) =>
  //                     section.completed_users.includes(session?.user.id ?? "")
  //                   )
  //                 );
  //                 if (
  //                   courseSections?.filter((section) =>
  //                     section.completed_users.includes(session?.user.id ?? "")
  //                   ).length !==
  //                   (courseSections?.length ?? 0) - 1
  //                 ) {
  //                   toast.warning(
  //                     "You haven't completed all the sections yet!"
  //                   );
  //                   return;
  //                 }

  //                 const isUserExists = (
  //                   content ?? courseSections![0]
  //                 ).completed_users.includes(session?.user.id ?? "");
  //                 if (isUserExists) {
  //                   router.refresh();
  //                   router.push(
  //                     `/course/${params.courseSlug}/?section=${
  //                       courseSections![
  //                         contentIndex === -1 || contentIndex === undefined
  //                           ? 1
  //                           : contentIndex + 1
  //                       ]?.id
  //                     }`
  //                   );
  //                 } else {
  //                   updateSectionCompletionMutation.mutate(
  //                     {
  //                       // userId: "",
  //                       userId: session?.user.id ?? "",
  //                       sectionId: (content ?? courseSections![0]).id,
  //                       completedUsers: (content ?? courseSections![0])
  //                         .completed_users,
  //                       isMarkComplete: true,
  //                       courseId: params.courseSlug,
  //                     },
  //                     {
  //                       onSuccess: async (updatedSectionCompletedUsers) => {
  //                         console.log({ updatedSectionCompletedUsers });

  //                         await queryClient.invalidateQueries({
  //                           queryKey: ["sections", params.courseSlug],
  //                         });
  //                         await queryClient.invalidateQueries({
  //                           queryKey: ["courses"],
  //                         });
  //                         await queryClient.invalidateQueries({
  //                           queryKey: ["coursesReports"],
  //                         });

  //                         router.refresh();
  //                         router.push(
  //                           `/course/${params.courseSlug}/?section=${
  //                             courseSections![
  //                               contentIndex === -1 ||
  //                               contentIndex === undefined
  //                                 ? 1
  //                                 : contentIndex + 1
  //                             ]?.id
  //                           }`
  //                         );
  //                       },
  //                       onError: (error) => {
  //                         console.log({ error });
  //                         // toast.error(error.message);
  //                       },
  //                     }
  //                   );
  //                 }
  //               }}
  //               disabled={updateSectionCompletionMutation.isPending}
  //               className="flex items-center gap-2 mx-auto"
  //             >
  //               Mark as complete{" "}
  //               {updateSectionCompletionMutation.isPending ? (
  //                 <Loader className="animate-spin" />
  //               ) : (
  //                 <Check className="size-4" />
  //               )}
  //             </Button>
  //           </div>
  //         )}
  //       </>
  //     )}
  //   </>
  // );

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  return (
    <>
      <CoursePage
        userId={user.id}
        courseSlug={params.courseSlug}
        sectionSlug={searchParams.section as string}
      />
      {/* <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
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
              userId={session?.user.id ?? ""}
            />
          )}
        </ScrollArea>
      </aside>
      <main
        className="relative py-6 lg:py-8 px-4"
        // className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
      >
        {sectionJsx}
      </main> */}
    </>
  );
}
