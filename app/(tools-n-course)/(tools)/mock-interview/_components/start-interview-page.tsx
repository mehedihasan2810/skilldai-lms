"use client";
import React, { useContext, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import QuestionSection from "./question-section";
import { Loader, Mic, MicOff, WebcamIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { updateUserAnswer } from "@/lib/db";
import { useVoiceToText } from "@/hooks/use-voice-to-text";
import { WebCamContext } from "../layout";
import Webcam from "react-webcam";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      setWebCamEnabled(false);
      stopListening();
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
      <div className="flex-1 grid place-items-center h-full">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuestionSection
          mockInterviewQuestion={jsonMockResp}
          activeQuestionIndex={activeQuestionIndex}
        />

        <div className="flex flex-col overflow-hidden w-full">
          <div className="w-full">
            {webCamEnabled ? (
              <Webcam
                mirrored={true}
                className="w-full rounded-md border"
                height={400}
                width={400}
              />
            ) : (
              <div className="flex items-center justify-center p-10 bg-secondary border rounded-md w-full">
                <WebcamIcon className="h-72 w-full" />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 w-full">
            <Button
              className="w-full"
              onClick={() => setWebCamEnabled(!webCamEnabled)}
            >
              {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
            </Button>
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
          {/* {transcript && (
            <div className="mt-4 p-4 rounded-lg">
              <h3 className="font-bold">Transcribed Answer:</h3>
              <p>{transcript}</p>
            </div>
          )} */}
        </div>
      </div>
      <div className="flex gap-3 md:justify-end md:gap-6 mt-4">
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
        {activeQuestionIndex != jsonMockResp.length - 1 &&
          (transcript.length === 0 ? (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger className={buttonVariants({className: "opacity-50 cursor-not-allowed"})}>
                  Next Question
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]">
                    Please record your answer before moving to the next question.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              onClick={() => {
                reset();
                setUserAnswers((prev) => {
                  if (prev.length === 0) {
                    return [
                      {
                        question: jsonMockResp[activeQuestionIndex]?.question,
                        userAnswer: transcript,
                        correctAnswer:
                          jsonMockResp[activeQuestionIndex]?.answer,
                      },
                    ];
                  } else {
                    const currentIndexData = prev[activeQuestionIndex];
                    console.log({ currentIndexData });

                    if (currentIndexData) {
                      return prev.map((item) => {
                        if (currentIndexData.question === item.question) {
                          return {
                            question:
                              jsonMockResp[activeQuestionIndex]?.question,
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
          )
          )
          }
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
                Evaluating answers...
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
