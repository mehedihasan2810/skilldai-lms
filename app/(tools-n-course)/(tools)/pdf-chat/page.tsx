import PageContainer from "@/components/dashboard/page-container";
import React from "react";
import { PDFChatPage } from "./_components/pdf-chat-page";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RecentPDFList } from "./_components/pdf-list";
import { GuideVideoDialog } from "./_components/guide-video-dialog";

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <PageContainer scrollable>
        <PDFChatPage userId={user.id} userEmail={user.email ?? ""} />
        <RecentPDFList userId={user.id} />
      </PageContainer>
      <GuideVideoDialog />
    </>
  );
};

export default Page;
