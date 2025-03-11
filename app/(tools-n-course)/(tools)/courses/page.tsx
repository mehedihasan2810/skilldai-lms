import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { redirect } from "next/navigation";
import { CourseList } from "./_components/course-list";
import { createClient } from "@/lib/supabase/server";

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  return (
    <PageContainer scrollable>
      <CourseList email={user.email!} />
    </PageContainer>
  );
};

export default Page;
