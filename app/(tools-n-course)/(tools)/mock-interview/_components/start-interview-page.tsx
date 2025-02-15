"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import QuestionSection from "./question-section";
import RecordAnswerSection from "./record-answer-section";

export const StartInterviewPage = ({
  interviewId,
}: {
  interviewId: string;
}) => {
//   const [interviewData, setInterviewData] = useState();
//   const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const { data: interviewData, error, isPending } = useQuery({
    queryKey: ["mockInterviews", interviewId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("mock_interviews")
        .select("*")
        .eq("id", interviewId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!data) throw new Error("No data found");
      return data;
    },
  });

//   useEffect(() => {
//     GetInterviewDetails();
//   }, []);

//   const GetInterviewDetails = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, interviewId));

//     const jsonMockResp = JSON.parse(result[0].jsonMockResp);
//     console.log(jsonMockResp);
//     setMockInterviewQuestion(jsonMockResp);
//     setInterviewData(result[0]);
//   };

if (error) {
    return <div>Error: {error.message}</div>;
  }

    if (isPending) {
        return <div>Loading...</div>;
    }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10">
        {/* Questin Section */}
        <QuestionSection
          mockInterviewQuestion={interviewData.json_mock_resp}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={interviewData.json_mock_resp}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex gap-3 my-5 md:my-0 md:justify-end md:gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != interviewData?.json_mock_resp?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == interviewData?.json_mock_resp?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
