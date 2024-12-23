import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { SkillAssessmentPage } from "./_components/skill-assessment-page";
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
      <SkillAssessmentPage userId={user.id} userEmail={user.email ?? ""} />
    </PageContainer>
  );
};

export default Page;
