import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NCERTPage } from "./_components/ncert-page";

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
    <div className="p-4 h-[calc(100dvh-65px)]">
      <NCERTPage searchParams={searchParams} userId={user.id} />
    </div>
  );
};

export default Page;
