import React from "react";
import { InterviewPage } from "../_components/interview-page";
import { notFound } from "next/navigation";
import PageContainer from "@/components/dashboard/page-container";

const Page = ({
  params,
}: {
  params: {
    interviewId: string;
  };
}) => {
  if (!params.interviewId?.trim()) notFound();

  return (
    <PageContainer scrollable>
      <InterviewPage interviewId={params.interviewId} />
    </PageContainer>
  );
};

export default Page;
