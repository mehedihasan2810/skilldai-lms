import React from "react";
import { StartInterviewPage } from "../../_components/start-interview-page";
import { notFound } from "next/navigation";

const Page = ({
  params,
}: {
  params: {
    interviewId: string;
  };
}) => {
  if (!params.interviewId?.trim()) notFound();
  return <StartInterviewPage interviewId={params.interviewId} />;
};

export default Page;
