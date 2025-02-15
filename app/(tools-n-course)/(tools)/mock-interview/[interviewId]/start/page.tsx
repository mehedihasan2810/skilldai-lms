import React from "react";
import { StartInterviewPage } from "../../_components/start-interview-page";
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
      <StartInterviewPage interviewId={params.interviewId} />
    </PageContainer>
  );
};

export default Page;
