import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PageContainer from "@/components/dashboard/page-container";
import { ExamPaperPage } from "./_components/exam-paper-page";

const Page = async ({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: {
    g: string | undefined;
    category: string | undefined;
    y: string | undefined;
    s: string | undefined;
    b: string | undefined;
    c: string | undefined;
  };
}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }
  console.log(searchParams);
  return (
    <PageContainer scrollable>
      <ExamPaperPage searchParams={searchParams} userId={user.id} />
    </PageContainer>
  );
};

export default Page;
