import React from "react";
import { InterviewPage } from "../_components/interview-page";
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
      <InterviewPage interviewId={params.interviewId} />
    </PageContainer>
  );
};

export default Page;
