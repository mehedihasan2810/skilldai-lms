"use client";
import { Lightbulb, Loader, WebcamIcon } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { WebCamContext } from "../context";

export const InterviewPage = ({ interviewId }: { interviewId: string }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);

  const queryClient = useQueryClient();

  const router = useRouter();

  const deleteAnswersMutation = useMutation({
    mutationFn: async ({ mockId }: { mockId: string }) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("mock_interview_user_answers")
        .delete()
        .eq("mock_id", mockId);
      if (error) throw new Error(error.message);
    },
  });

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
    return (
      <div className="flex-1 grid place-items-center">
        Error: {error.message}
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex-1 grid place-items-center h-full">
        <div className="flex gap-2 items-center">
          <Loader className="size-5 animate-spin" /> Please wait...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 flex-1">
      <h2 className="font-bold text-2xl mb-6">Let&apos;s Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5 bg-card shadow">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>
              {interviewData?.job_position}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Job Stack: </strong>
              {interviewData?.job_desc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.job_experience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-600 bg-yellow-600/5">
            <h2 className="flex gap-2 items-center text-yellow-500 mb-2">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable Video Web Cam and Microphone to start your AI generated
              mock interview, It has 5 question which you can answer and at the
              last you will get report on the basis of your answer.NOT: We never
              record your video , web cam access you can disable at any time if
              you want
            </h2>
          </div>
        </div>
        <div className="w-full ">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              height={300}
              width={300}
              mirrored={true}
              className="w-full rounded-md"
            />
          ) : (
            <div className="p-4 bg-secondary border rounded-md">
              <WebcamIcon className="h-72 w-full" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              variant={webCamEnabled ? "destructive" : "outline"}
              className={`${webCamEnabled ? "w-full" : "w-full"}`}
              onClick={() => setWebCamEnabled(!webCamEnabled)}
            >
              {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
            </Button>
            <Button
              disabled={deleteAnswersMutation.isPending}
              onClick={() => {
                deleteAnswersMutation.mutate(
                  { mockId: interviewId },
                  {
                    onSuccess: async () => {
                      await queryClient.invalidateQueries({
                        queryKey: ["feedbacks"],
                      });
                      router.push(`/mock-interview/${interviewId}/start`);
                    },
                    onError: (error) => {
                      console.error(error);
                      toast.error(error.message);
                    },
                  }
                );
              }}
              // href={`/mock-interview/${interviewId}/start`}
            >
              {deleteAnswersMutation.isPending ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Start Interview"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
