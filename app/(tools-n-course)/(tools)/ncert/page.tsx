import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NCERTPage } from "./_components/ncert-page";
import PageContainer from "@/components/dashboard/page-container";

const Page = async ({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: {
    g: string | undefined;
    s: string | undefined;
    b: string | undefined;
    c: string | undefined;
  };
}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }
  console.log(searchParams);
  return (
    <PageContainer scrollable>
      <NCERTPage searchParams={searchParams} userId={user.id} />
    </PageContainer>
  );
};

export default Page;
