import Markdown from "@/components/markdown/markdown";
import { createClient } from "@/lib/supabase/server";
import React from "react";
import { LessonPlanPage } from "./_components/lesson-plan-page";
import PageContainer from "@/components/dashboard/page-container";
import { redirect } from "next/navigation";

const Page = async (
  props: {
    params: Promise<{
      id: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const params = await props.params;
  console.log({ params });

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
      <LessonPlanPage userId={user.id} id={params.id} />
    </PageContainer>
  );
};

export default Page;
