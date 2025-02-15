"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, Loader } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button, buttonVariants } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import PageContainer from "@/components/dashboard/page-container";

const Feedback = () => {
  const router = useRouter();
  //   const [feedbackList, setFeedbackList] = useState([]);

  const params = useParams<{ interviewId: string }>();

  console.log({ params });

  const {
    data: feedbackList,
    error,
    isPending,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("mock_interview_user_answers")
        .select("*")
        .eq("mock_id", params.interviewId);
      if (error) throw new Error(error.message);
      return data;
    },
  });

  //   useEffect(() => {
  //     GetFeedback();
  //   }, []);

  //   const GetFeedback = async () => {
  //     const result = await db
  //       .select()
  //       .from(UserAnswer)
  //       .where(eq(UserAnswer.mockIdRef, params.interviewId))
  //       .orderBy(UserAnswer.id);

  //     console.log(result);
  //     setFeedbackList(result);
  //   };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const totalRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.rating),
        0
      );
      // console.log("total",totalRating);
      // console.log("length",feedbackList.length);
      return +(totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  if (error) {
    return (
      <div className="flex-1 grid place-items-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex-1 grid place-items-center">
        {" "}
        <div className="flex items-center gap-2">
          <Loader className="size-5 animate-spin" /> Please wait...
        </div>
      </div>
    );
  }

  return (
    <PageContainer scrollable>
      <div className="p-4 lg:p-10">
        {feedbackList?.length == 0 ? (
          <h2 className="font-bold text-xl my-5">
            No Interview feedback Record Found
          </h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-green-500">
              Congratulations
            </h2>
            <p className="font-medium text-xl mt-2">
              Here is your interview feedback
            </p>
            <h2 className="text-primary text-lg my-3">
              Your overall interview rating{" "}
              <strong
                className={`${
                  overallRating >= 5 ? "text-green-500" : "text-red-600"
                }`}
              >
                {overallRating}
                <span className="text-foreground"> / 10</span>
              </strong>
            </h2>
            <p className="">
              Find below interview question with correct answer, Your answer and
              feedback for improvement
            </p>
            {feedbackList &&
              feedbackList.map((item, index) => (
                <Collapsible
                  key={index}
                  className="mt-4 bg-card p-4 rounded-xl border"
                >
                  <CollapsibleTrigger className="rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                    {item.question} <ChevronDown className="h-5 w-5 shrink-0" />{" "}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-col gap-4">
                      <h2 className="text-red-600 p-4 border border-red-600 rounded-lg bg-red-600/5">
                        <strong>Rating: </strong>
                        {item.rating}
                      </h2>
                      <h2 className="p-4 border border-red-600 rounded-lg bg-red-600/5 text-sm text-red-600">
                        <strong>Your Answer: </strong>
                        {item.user_answer}
                      </h2>
                      <h2 className="p-4 border rounded-lg border-green-600 bg-green-600/5 text-sm text-green-600">
                        <strong>Correct Answer: </strong>
                        {item.correct_answer}{" "}
                        {/* Updated to match the API response field */}
                      </h2>
                      <h2 className="p-4 border rounded-lg bg-card text-sm text-primary-900">
                        <strong>Feedback: </strong>
                        {item.feedback}
                      </h2>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
          </>
        )}

        <Link
          className={buttonVariants({ className: "mt-4" })}
          href={"/mock-interview"}
        >
          New interview
        </Link>
      </div>
    </PageContainer>
  );
};

export default Feedback;
