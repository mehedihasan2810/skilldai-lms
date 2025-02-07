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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const userId = session.user.id;
  const email = session.user.email;


  return (
    <>
      <PageContainer scrollable>
        <PDFChatPage userId={userId} userEmail={email ?? ""} />
        <RecentPDFList userId={userId} />
      </PageContainer>
      <GuideVideoDialog />
    </>
  );
};

export default Page;
