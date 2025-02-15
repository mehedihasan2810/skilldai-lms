"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import QuestionSection from "./question-section";
import { Loader, Mic, MicOff, Router } from "lucide-react";
import { isUserAnswerProcessingAtom } from "../atoms";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "nextjs-toploader/app";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateUserAnswer } from "@/lib/db";
import { useVoiceToText } from "@/hooks/use-voice-to-text";
import Image from "next/image";
import { WebCamContext } from "../layout";
import Webcam from "react-webcam";

export const StartInterviewPage = ({
  interviewId,
}: {
  interviewId: string;
}) => {
  //   const [interviewData, setInterviewData] = useState();
  //   const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const [userAnswers, setUserAnswers] = useState<
    { question: string; userAnswer: string; correctAnswer: string }[]
  >([]);

  console.log({ userAnswers });

  const router = useRouter();

  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);

  const {
    startListening,
    stopListening,
    transcript,
    setTranscript,
    reset,
    isListening,
  } = useVoiceToText();

  console.log({ transcript });

  const updateUserAnswerMutation = useMutation({
    mutationFn: async ({
      userAnswers,
      mockId,
    }: {
      userAnswers: {
        question: string;
        userAnswer: string;
        correctAnswer: string;
      }[];
      mockId: string;
    }) => {
      await updateUserAnswer({
        userAnswers,
        mockId,
      });
    },
    onSuccess: () => {
      toast.success("User Answer recorded successfully");
      router.push(`/mock-interview/${interviewData.id}/feedback`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        `An error occurred while recording the user answer. Error ${error.message}`
      );
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

  // console.log({ interviewData });

  console.log({ activeQuestionIndex });

  const jsonMockResp = JSON.parse(interviewData.json_mock_resp);

  console.log({ jsonMockResp });

  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 my-10">
        <QuestionSection
          mockInterviewQuestion={jsonMockResp}
          activeQuestionIndex={activeQuestionIndex}
        />

        <div className="flex flex-col items-center justify-center overflow-hidden">
          <div className="flex flex-col justify-center items-center rounded-lg p-5 bg-black mt-4 w-[30rem] ">
            {webCamEnabled ? (
              <Webcam
                mirrored={true}
                style={{ height: 250, width: "100%", zIndex: 10 }}
              />
            ) : (
              <Image
                src={"/camera.jpg"}
                width={200}
                height={200}
                alt="Camera placeholder"
              />
            )}
          </div>
          <div className="md:flex mt-4 md:mt-8 md:gap-5">
            <div className="my-4 md:my-0">
              <Button onClick={() => setWebCamEnabled(!webCamEnabled)}>
                {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
              </Button>
            </div>
            <Button
              variant={isListening ? "destructive" : "secondary"}
              onClick={isListening ? stopListening : startListening}
              // disabled={loading || updateUserAnswerMutation.isPending}
              className="flex items-center gap-2"
            >
              {isListening ? (
                <>
                  <MicOff className="size-5" /> Stop Recording...
                </>
              ) : (
                <>
                  <Mic className="size-5" />
                  Record Answer
                </>
              )}
            </Button>
          </div>
          {/* Check transcription code */}
          {transcript && (
            <div className="mt-4 p-4 rounded-lg">
              <h3 className="font-bold">Transcribed Answer:</h3>
              <p>{transcript}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3 my-5 md:my-0 md:justify-end md:gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => {
              reset();

              // setUserAnswers((prev) => {
              //   if (prev.length === 0) {
              //     return [
              //       {
              //         question: jsonMockResp[activeQuestionIndex]?.question,
              //         userAnswer: transcript,
              //         correctAnswer: jsonMockResp[activeQuestionIndex]?.answer,
              //       },
              //     ];
              //   } else {
              //     return prev.filter((item, i) => {
              //       if (i === activeQuestionIndex) {
              //         return {
              //           question: jsonMockResp[activeQuestionIndex]?.question,
              //           userAnswer: transcript,
              //           correctAnswer:
              //             jsonMockResp[activeQuestionIndex]?.answer,
              //         };
              //       }

              //       return item;
              //     });
              //   }
              // });

              setActiveQuestionIndex(activeQuestionIndex - 1);
            }}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != jsonMockResp.length - 1 && (
          <Button
            onClick={() => {
              reset();
              setUserAnswers((prev) => {
                if (prev.length === 0) {
                  return [
                    {
                      question: jsonMockResp[activeQuestionIndex]?.question,
                      userAnswer: transcript,
                      correctAnswer: jsonMockResp[activeQuestionIndex]?.answer,
                    },
                  ];
                } else {
                  const currentIndexData = prev[activeQuestionIndex];
                  console.log({ currentIndexData });

                  if (currentIndexData) {
                    return prev.map((item) => {
                      if (currentIndexData.question === item.question) {
                        return {
                          question: jsonMockResp[activeQuestionIndex]?.question,
                          userAnswer: transcript,
                          correctAnswer:
                            jsonMockResp[activeQuestionIndex]?.answer,
                        };
                      }

                      return item;
                    });
                  } else {
                    return [
                      ...prev,
                      {
                        question: jsonMockResp[activeQuestionIndex]?.question,
                        userAnswer: transcript,
                        correctAnswer:
                          jsonMockResp[activeQuestionIndex]?.answer,
                      },
                    ];
                  }
                }
              });
              setActiveQuestionIndex(activeQuestionIndex + 1);
            }}
            disabled={transcript.length === 0}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == jsonMockResp.length - 1 && (
          <Button
            disabled={
              updateUserAnswerMutation.isPending || transcript.length === 0
            }
            onClick={() => {
              updateUserAnswerMutation.mutate({
                userAnswers,
                mockId: interviewId,
              });
            }}
            className="flex items-center gap-2"
          >
            {updateUserAnswerMutation.isPending ? (
              <>
                <Loader className="size-5 animate-spin" />
                Processing answers...
              </>
            ) : (
              "End Interview"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
