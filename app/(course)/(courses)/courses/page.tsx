import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { redirect } from "next/navigation";
import { CourseList } from "./_components/course-list";
import { createClient } from "@/lib/supabase/server";

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <PageContainer scrollable>
      <CourseList email={user.email!} />
    </PageContainer>
  );
};

export default Page;
