import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { CreateQuizFromDocPanel } from "./_components/create-quiz-from-doc-panel";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RecentQuizList } from "./_components/recent-quiz-list";

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
      <CreateQuizFromDocPanel userId={user.id} userEmail={user.email ?? ""} />
      <RecentQuizList userId={user.id} />
    </PageContainer>
  );
};

export default Page;
