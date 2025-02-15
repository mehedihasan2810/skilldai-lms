"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { WebCamContext } from "../layout";
import { useMutation } from "@tanstack/react-query";
import { updateUserAnswer } from "@/lib/db";
import { transcribeMockInterview } from "@/actions/transcribe-mock-interview-audio";

interface MockInterviewQuestion {
  Question: string;
  Answer: string;
}

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}: {
  mockInterviewQuestion: MockInterviewQuestion[];
  activeQuestionIndex: number;
  interviewData: any;
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  //   const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const updateUserAnswerMutation = useMutation({
    mutationFn: async ({
      userAnswer,
      mockQuestion,
      correctAnswer,
      mockId,
    }: {
      userAnswer: string;
      mockQuestion: string;
      correctAnswer: string;
      mockId: string;
    }) => {
      await updateUserAnswer({
        userAnswer,
        mockQuestion,
        correctAnswer,
        mockId,
      });
    },
    onSuccess: () => {
      setUserAnswer("");
      toast.success("User Answer recorded successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred while recording the user answer");
    },
  });

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswerMutation.mutate({
        userAnswer,
        mockQuestion: mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.Answer,
        mockId: interviewData.id,
      });
    }
  }, [userAnswer, isRecording, activeQuestionIndex]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log(event.data);
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        console.log({ audioBlob });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast(
        "Error starting recording. Please check your microphone permissions."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      setLoading(true);
      //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Convert audio blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        // const base64Audio = (reader.result as string)?.split(",")[1];

        console.log({ base64Audio });

        const transcription = await transcribeMockInterview({
          audioBase64: base64Audio,
        });

        console.log({ transcription });

        // const result = await model.generateContent([
        //   "Transcribe the following audio:",
        //   { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
        // ]);

        // const transcription = result.response.text();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast.error("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer2 = async () => {
    try {
      setLoading(true);
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.Question +
        ", User Answer:" +
        userAnswer +
        " , Depends on question and user answer for given interview question" +
        " please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      // updateUserAnswerMutation.mutate({ userAnswer });

      //   const result = await chatSession.sendMessage(feedbackPrompt);

      //   let MockJsonResp = result.response.text();
      //   console.log(MockJsonResp);

      //   // Removing possible extra text around JSON
      //   MockJsonResp = MockJsonResp.replace("```json", "").replace("```", "");

      //   // Attempt to parse JSON
      //   let jsonFeedbackResp;
      //   try {
      //     jsonFeedbackResp = JSON.parse(MockJsonResp);
      //   } catch (e) {
      //     throw new Error("Invalid JSON response: " + MockJsonResp);
      //   }

      //   const resp = await db.insert(UserAnswer).values({
      //     mockIdRef: interviewData?.mockId,
      //     question: mockInterviewQuestion[activeQuestionIndex]?.Question,
      //     correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
      //     userAns: userAnswer,
      //     feedback: jsonFeedbackResp?.feedback,
      //     rating: jsonFeedbackResp?.rating,
      //     userEmail: user?.primaryEmailAddress?.emailAddress,
      //     createdAt: moment().format("YYYY-MM-DD"),
      //   });

      //   if (resp) {
      //     toast("User Answer recorded successfully");
      //   }
      setUserAnswer("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast("An error occurred while recording the user answer");
      setLoading(false);
    }
  };

  return (
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
          variant="outline"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
        >
          {isRecording ? (
            <h2 className="text-red-400 flex gap-2 ">
              <Mic /> Stop Recording...
            </h2>
          ) : (
            " Record Answer"
          )}
        </Button>
      </div>
      {/* Check transcription code */}
      {/* {userAnswer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold">Transcribed Answer:</h3>
          <p>{userAnswer}</p>
        </div>
      )} */}
    </div>
  );
};

export default RecordAnswerSection;
