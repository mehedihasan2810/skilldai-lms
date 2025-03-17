import React from "react";
import { StartInterviewPage } from "../../_components/start-interview-page";
import { notFound } from "next/navigation";
import PageContainer from "@/components/dashboard/page-container";

const Page = async (
  props: {
    params: Promise<{
      interviewId: string;
    }>;
  }
) => {
  const params = await props.params;
  if (!params.interviewId?.trim()) notFound();
  return (
    <PageContainer scrollable>
      <StartInterviewPage interviewId={params.interviewId} />
    </PageContainer>
  );
};

export default Page;
