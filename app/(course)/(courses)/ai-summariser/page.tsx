import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { AISummarizerPage } from "./_components/summarizer-page";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RecentSummaryList } from "./_components/summary-list";

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
      <AISummarizerPage userId={user.id} userEmail={user.email ?? ""} />
      <RecentSummaryList userId={user.id} />
    </PageContainer>
  );
};

export default Page;
