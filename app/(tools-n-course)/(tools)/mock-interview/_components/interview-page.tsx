"use client";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { useContext } from "react";
import { WebCamContext } from "../layout";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export const InterviewPage = ({ interviewId }: { interviewId: string }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);

  const {
    data: interviewData,
    error,
    isPending,
  } = useQuery({
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 lg:p-6 flex-1">
      <h2 className="font-bold text-2xl text-center">Let&apos;s Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Job Stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-700 mb-2">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <div className=" flex items-center justify-center p-10">
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                height={300}
                width={300}
                mirrored={true}
              />
            </div>
          ) : (
            <div>
              <WebcamIcon className="h-72 w-full my-6 p-20 bg-secondary rounded-lg border" />
            </div>
          )}
          <div>
            <Button
              className={`${webCamEnabled ? "w-full" : "w-full"}`}
              onClick={() => setWebCamEnabled(!webCamEnabled)}
            >
              {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4 md:my-0 md:justify-end md:items-end">
        <Link href={`/mock-interview/${interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};
