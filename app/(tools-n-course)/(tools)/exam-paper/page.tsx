import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PageContainer from "@/components/dashboard/page-container";
import { ExamPaperPage } from "./_components/exam-paper-page";

const Page = async (
  props: {
    params: Promise<{
      id: string;
    }>;
    searchParams: Promise<{
      g: string | undefined;
      category: string | undefined;
      y: string | undefined;
      s: string | undefined;
      b: string | undefined;
      c: string | undefined;
    }>;
  }
) => {
  const searchParams = await props.searchParams;
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
      <ExamPaperPage searchParams={searchParams} userId={user.id} />
    </PageContainer>
  );
};

export default Page;
