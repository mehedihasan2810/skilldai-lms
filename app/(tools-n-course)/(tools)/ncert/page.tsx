import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NCERTPage } from "./_components/ncert-page";
import PageContainer from "@/components/dashboard/page-container";

const Page = async (
  props: {
    params: Promise<{
      id: string;
    }>;
    searchParams: Promise<{
      g: string | undefined;
      s: string | undefined;
      b: string | undefined;
      c: string | undefined;
    }>;
  }
) => {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  console.log(searchParams);
  return (
    <PageContainer scrollable>
      <NCERTPage searchParams={searchParams} userId={user.id} />
    </PageContainer>
  );
};

export default Page;
