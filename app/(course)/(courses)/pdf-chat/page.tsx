import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { PDFChatPage } from "./_components/pdf-chat-page";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RecentPDFList } from "./_components/pdf-list";

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
      <PDFChatPage userId={user.id} userEmail={user.email ?? ""} />
      <RecentPDFList userId={user.id} />
    </PageContainer>
  );
};

export default Page;
