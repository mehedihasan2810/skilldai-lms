import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { SkillAssessmentPage } from "./_components/skill-assessment-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
      <SkillAssessmentPage userId={user.id} userEmail={user.email ?? ""} />
    </PageContainer>
  );
};

export default Page;
