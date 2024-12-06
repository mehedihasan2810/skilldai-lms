import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { CreateQuizFromDocPanel } from "./_components/create-quiz-from-doc-panel";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
      <CreateQuizFromDocPanel userId={user.id} />
    </PageContainer>
  );
};

export default Page;
