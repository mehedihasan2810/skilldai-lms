import { Button } from "@/components/ui";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

interface QuestionSectionProps {
  mockInterviewQuestion: any[]; // Replace 'any' with a more specific type if possible
  activeQuestionIndex: number;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  mockInterviewQuestion,
  activeQuestionIndex,
}) => {
  const textToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className=" flex flex-col justify-between p-5 border rounded-lg my-1 bg-card h-fit">
        <div>
          <div className="flex flex-wrap gap-4">
            {mockInterviewQuestion &&
              mockInterviewQuestion.map((question, index) => (
                <div
                  key={index}
                  className={`py-2 px-4  rounded-full text-center text-xs md:text-sm cursor-pointer ${
                    activeQuestionIndex == index
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  Question {index + 1}
                </div>
              ))}
          </div>
          <h2 className="text-md md:text-lg mt-4">
            {mockInterviewQuestion[activeQuestionIndex]?.question}
          </h2>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
            className="mt-2"
          >
            <Volume2 className="cursor-pointer" />
          </Button>
        </div>

        <div className="mt-4 border rounded-lg p-5 bg-blue-600/5 border-blue-600 mt-18 md:block hidden">
          <h2 className="flex gap-2 items-center text-blue-600">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-600 my-2">
            Click on record answer when you want to answer the question. At the
            end of interview we will give you the feedback along with correct
            answer for each of question and your answer to compare it.
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
