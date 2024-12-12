import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
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

  const { error, data } = await supabase
    .from("user_info")
    .select("id,profession")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const isRoleTeacher = data.profession === "Teacher";

  if (!isRoleTeacher) {
    notFound();
  }

  return (
    <PageContainer scrollable>
      <WorksheetGeneratorPage userId={user.id} userEmail={user.email ?? ""} />
      <WorksheetsList userId={user.id} />
    </PageContainer>
  );
};

export default Page;
