// app/1on1tutoring/my-courses/page.tsx
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import CourseCard from "./_components/coursecard";
import { Card, CardContent } from "@/components/ui/card";
import { SkillBridgeGuideVideoDialog } from "../_components/guide-video";

interface Course {
  id: string;
  subject: string;
  proficiency: string;
  email: string;
}

export default async function MyCoursesPage() {
  const supabase = await createClient();

  // Fetch user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Please log in to view your courses.</p>
      </div>
    );
  }

  // Fetch courses
  const { data: courses, error: coursesError } = await supabase
    .from("modules_1on1tutor")
    .select("id, subject, proficiency")
    .eq("user_id", user.id);

  if (coursesError) {
    console.error("Error fetching courses:", coursesError);
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-center">
        <p className="text-red-500">Failed to load courses.</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6">My Courses</h1>
        {courses && courses.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500">No courses found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {courses?.map((course: any) => (
              <CourseCard
                key={course.id}
                id={course.id}
                subject={course.subject}
                proficiency={course.proficiency}
                email={course.email}
                userId={user.id}
              />
            ))}
          </div>
        )}
      </div>

      <SkillBridgeGuideVideoDialog />
    </>
  );
}
