import React from "react";
import { QuizPanel } from "../_components/quiz-panel";
import PageContainer from "@/components/dashboard/page-container";
import { createClient } from "@/lib/supabase/server";
import Quiz from "../_components/quiz";

const Page = async ({
  params,
  searchParams,
}: {
  params: { quizId: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  console.log(params);

  const supabase = await createClient();

  const { error, data } = await supabase
    .from("qfd_quiz")
    // .select("*")
    .select(
      `
      *,
      qfd_questions (
        id,
        quiz_id,
        question,
        answer,
        options
      )
    `
    )
    .eq("id", params.quizId)
    .single();

  // console.log({ error });
  // console.log("dtaaa");
  // console.log(data);
  return (
    <PageContainer scrollable>
      <QuizPanel quizId={params.quizId} />
      {/* {error && !data ? (
        <div>Error: {error.message}</div>
      ) : (
        <Quiz
          title={data.title}
          questions={data.qfd_questions}
          quizId={params.quizId}
          correctAnswers={data.correct_answers}
        />
      )} */}
    </PageContainer>
  );
};

export default Page;
