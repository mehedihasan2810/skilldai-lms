import { createClient } from "@/lib/supabase/server";
import React from "react";
import PageContainer from "@/components/dashboard/page-container";
import { redirect } from "next/navigation";
import { WorksheetPage } from "./_components/worksheet-page";

const Page = async ({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log({ params });

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
      <WorksheetPage userId={user.id} id={params.id} />
    </PageContainer>
  );
};

export default Page;
