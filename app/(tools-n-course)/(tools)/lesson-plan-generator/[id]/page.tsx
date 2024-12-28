import Markdown from "@/components/markdown/markdown";
import { createClient } from "@/lib/supabase/server";
import React from "react";
import { LessonPlanPage } from "./_components/lesson-plan-page";
import PageContainer from "@/components/dashboard/page-container";
import { redirect } from "next/navigation";

const Page = async ({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log({ params });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <PageContainer scrollable>
      <LessonPlanPage userId={user.id} id={params.id} />
    </PageContainer>
  );
};

export default Page;
