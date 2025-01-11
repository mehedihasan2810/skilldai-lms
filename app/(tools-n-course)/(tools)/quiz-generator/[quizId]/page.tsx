import React from "react";
import PageContainer from "@/components/dashboard/page-container";
import { QuizPanel } from "../../quiz-from-doc/_components/quiz-panel";

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
