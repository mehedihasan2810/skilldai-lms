import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { WorksheetGeneratorPage } from "./_components/worksheet-generator-page";
import { WorksheetsList } from "./_components/worksheets-list";

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  // const { error, data } = await supabase
  //   .from("user_info")
  //   .select("id,profession")
  //   .eq("user_id", user.id)
  //   .single();

  // if (error) {
  //   console.error(error);
  //   // throw new Error(error.message);
  // }

  const user = session.user;

  const userMetadata = user.user_metadata;

  const isRoleTeacher = userMetadata?.profession === "Teacher";

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
