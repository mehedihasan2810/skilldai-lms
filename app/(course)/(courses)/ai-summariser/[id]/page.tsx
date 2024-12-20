import { createClient } from "@/lib/supabase/server";
import React from "react";
import PageContainer from "@/components/dashboard/page-container";
import { redirect } from "next/navigation";
import { SummaryPage } from "./_components/summary-page";

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
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <PageContainer scrollable>
      <SummaryPage userId={user.id} id={params.id} />
    </PageContainer>
  );
};

export default Page;
