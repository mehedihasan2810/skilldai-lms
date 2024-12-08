import React from "react";
import { QuizPanel } from "../_components/quiz-panel";
import PageContainer from "@/components/dashboard/page-container";

const Page = async ({
  params,
  searchParams,
}: {
  params: { quizId: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  console.log(params);

  return (
    <PageContainer scrollable>
      <QuizPanel quizId={params.quizId} />
    </PageContainer>
  );
};

export default Page;
