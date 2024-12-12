import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { WorksheetGeneratorPage } from "./_components/worksheet-generator-page";
import { WorksheetsList } from "./_components/worksheets-list";

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
      <WorksheetGeneratorPage userId={user.id} userEmail={user.email ?? ""} />
      <WorksheetsList userId={user.id} />
    </PageContainer>
  );
};

export default Page;
