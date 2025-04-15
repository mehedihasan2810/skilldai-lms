"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "@/components/markdown/markdown";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Props {
  questions: QuizQuestion[];
  userEmail: string;
  userId: string;
  chatId:string;
  subject: string;
  proficiency:string;
}

export default function QuizPage({ questions, subject, userEmail, userId ,chatId,proficiency}: Props) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const { messages, append, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/1on1tutoring/chat",
    body: { email: userEmail, userId ,chatId,subject,quizCompleted},
  });

  const handleAnswerSubmit = () => {
    if (!selectedAnswer || !questions.length) return;

    const correctAnswer = questions[currentQuestion].correctAnswer;

    append({
      role: "user",
      content: `I answered "${selectedAnswer}" to "${questions[currentQuestion].question}". The correct answer is "${correctAnswer}".`,
    });


    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizCompleted(true); // Set quizCompleted to true when quiz ends
      append({
        role: "user",
        content: `I have completed the "${subject}" quiz. Please provide feedback on my performance based on all my answers.`,
      });
    }
  };

  if (!questions.length) return <div className="text-center p-4 w-full">Loading quiz...</div>;

  return (
    <div className="min-h-screen p-4 flex flex-row w-full" style={{ width: "170vh" }}>
      {/* Quiz Section */}
      <ScrollArea className="h-[70vh] md:h-[89vh] rounded-xl w-full">
        <Card className="flex-grow flex-shrink-0 basis-2/3 min-w-[66%] h-full">
          <CardHeader>
            <CardTitle className="text-2xl">{subject} Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            {!quizCompleted ? (
              <div className="space-y-6">
                <h2 className="text-xl">
                  {currentQuestion + 1}. {questions[currentQuestion].question}
                </h2>
                <div className="space-y-2">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      className="w-full text-left justify-start"
                      onClick={() => setSelectedAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer || isLoading}
                    className="w-full"
                  >
                    Submit Answer
                  </Button>
                  {showFeedback && (
                    <Button
                      onClick={handleNextQuestion}
                      variant="secondary"
                      className="w-full"
                      disabled={isLoading}
                    >
                      Next Question
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-lg">
                Quiz Completed! Check the AI Assistant for feedback.
                if you want to continue for a course click <Button onClick={() => {window.location.href = `/1on1tutoring/course?subject=${subject}&proficiency=${proficiency}&chatId=${chatId}&userEmail=${userEmail}&userId=${userId}`;}}>Go For Course</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </ScrollArea>

      {/* AI Assistant Section */}
      <ScrollArea className="md:h-[89vh] rounded-xl w-full h-full">
        <Card className="flex-grow flex-shrink-0 basis-1/3 min-w-[33%] min-h-[70vh]">
          <CardHeader>
            <CardTitle className="text-xl">AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-full overflow-y-auto border rounded-md p-2 space-y-2 min-h-[100%]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`inline-block p-2 rounded-md border ${
                      m.role === "user" ? "border-blue-500" : "border-gray-500"
                    }`}
                  >
                    {m.role === "user" && (
                      <div className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-2xl break-words break-all whitespace-pre-wrap">
                        {m.content}
                      </div>
                    )}
                    {m.role === "assistant" && (
                      <Markdown text={m.content} className="max-w-2xl break-all" />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <span className="inline-block p-2 rounded-md max-w-[80%] border border-gray-500 text-gray-500">
                    Typing...
                  </span>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask the AI about your answer..."
                disabled={isLoading}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Asking..." : "Ask"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
}