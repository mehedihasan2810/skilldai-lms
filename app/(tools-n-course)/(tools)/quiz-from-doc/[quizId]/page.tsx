import React from "react";
import { QuizPanel } from "../_components/quiz-panel";
import PageContainer from "@/components/dashboard/page-container";

const Page = async (
  props: {
    params: Promise<{ quizId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const params = await props.params;
  console.log(params);

  return (
    <PageContainer scrollable>
      <QuizPanel quizId={params.quizId} />
    </PageContainer>
  );
};

export default Page;
