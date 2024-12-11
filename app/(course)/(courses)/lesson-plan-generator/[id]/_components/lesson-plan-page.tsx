"use client";
import Markdown from "@/components/markdown/markdown";
import { Button, buttonVariants } from "@/components/ui";
import { Check, Copy, Download, FileText, Printer } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getLessonPlan } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import markdownToTxt from "markdown-to-txt";

export const LessonPlanPage = ({
  userId,
  id,
}: {
  userId: string;
  id: string;
}) => {
  const [textToCopy, setTextToCopy] = useState("Copy this text");
  const [isCopied, setIsCopied] = useState(false);

  const {
    data: lessonPlan,
    error,
    isLoading,
  } = useQuery<{ title: string; plan: string }>({
    queryKey: ["lessonPlan", id],
    queryFn: async () => await getLessonPlan({ lessonPlanId: id }),
  });

  const handleCopy = async () => {
    try {
      const texts = markdownToTxt(lessonPlan?.plan ?? "");
      await navigator.clipboard.writeText(`${lessonPlan?.title}\n\n${texts}`);
      setIsCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error(`Failed to copy text: ${(err as Error).message}`);
    }
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const texts = markdownToTxt(lessonPlan?.plan ?? "");
    const file = new Blob([`${lessonPlan?.title}\n\n${texts}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "my-lesson-plan.txt";
    // document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handlePrint = () => {
    const plainText = markdownToTxt(lessonPlan?.plan ?? "");
    // Wrap the plain text in preformatted tags for better readability
    const formattedText = `<pre>${lessonPlan?.title}\n\n${plainText}</pre>`;
    printText(formattedText);
  };

  function printText(content: string) {
    const printWindow = window.open("", "_blank")!;
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Text</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              line-height: 1.6;
              font-size: 20px;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  console.log({ lessonPlan });

  return (
    <div className="mb-16 mt-8 bg-card rounded-xl p-6 max-w-4xl mx-auto shadow-md border border-border/50">
      {error ? (
        <p>Error: {error.message}</p>
      ) : isLoading ? (
        <div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-24 h-9" />
            <Skeleton className="w-24 h-9" />
            <Skeleton className="w-24 h-9" />
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({
                  className: "flex items-center gap-2",
                })}
              >
                <Download className="size-5" /> Download
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={downloadTxtFile}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="size-5" /> Text
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleCopy} className="flex items-center gap-2">
              {isCopied ? (
                <Check className="size-5" />
              ) : (
                <Copy className="size-5" />
              )}{" "}
              Copy
            </Button>
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="size-5" /> Print
            </Button>
          </div>

          <h1 className="text-2xl font-bold mb-2 mt-6">{lessonPlan?.title}</h1>
          <Markdown text={lessonPlan?.plan ?? ""} className="w-full" />
        </>
      )}
    </div>
  );
};

const dummyLessonPlan = `
### Lesson Plan: Introduction to the Industrial Revolution

**Grade Level:** Beginners  
**Lesson Duration:** 30 minutes  
**Lesson Style:** Creative  

#### Objectives:
1. Students will be able to identify three major changes that occurred during the Industrial Revolution.
2. Students will understand the impact of the Industrial Revolution on daily life.
3. Students will engage creatively with the material through a role-play activity.

#### Previous Lesson:
N/A - This is an introductory lesson on the Industrial Revolution.

#### Beginning of the Lesson:
**Starter Activity: "Time Travel Talk"**
- Begin the lesson with a brief imaginative exercise. Ask students to close their eyes and imagine they are time travelers visiting the world before the Industrial Revolution. Describe a rural, agrarian society where most goods are handmade.
- Transition by asking, "What if I told you that in just a few decades, the world you just imagined would change dramatically? Let's find out how."

#### Learning/Inquiry:
**Interactive Lecture with Visual Aids**
- Use a PowerPoint presentation to introduce the Industrial Revolution, starting in the late 18th century. Highlight key inventions like the steam engine, the spinning jenny, and the power loom.
- Discuss the shift from agrarian to industrial societies, emphasizing changes in daily life, such as urbanization and the rise of factories.
- Incorporate short, engaging video clips (2-3 minutes) that show simulations of factories or animations explaining key inventions.

#### Practice/Experience:
**Role-Play Activity: "A Day in the Life"**
- Divide the class into small groups. Assign each group a role: factory workers, factory owners, or farmers before the Industrial Revolution.
- Provide each group with a scenario card that describes their daily life and challenges. Allow 5 minutes for preparation.
- Have groups perform a 2-minute role-play in front of the class, depicting their assigned roles.

#### Assessment:
**Quick Reflection Quiz & Discussion**
- Conduct a 5-question quiz to assess understanding of key concepts (e.g., significance of inventions, changes in lifestyle).
- Follow with a class discussion where students can share what surprised them the most about the changes during the Industrial Revolution.

#### Summary:
**Recap and Key Takeaways**
- Summarize the major points covered: key inventions, the shift from rural to urban life, and the socio-economic impacts.
- Highlight how these changes laid the groundwork for the modern world.

#### Homework:
**Research Assignment**
- Assign students to research one major invention of the Industrial Revolution not covered in class. They should prepare a short paragraph on how it works and its impact on society, to be shared in the next class.

#### Resources Required:
- Computer and projector for PowerPoint presentation.
- Access to short educational videos about the Industrial Revolution.
- Printed scenario cards for the role-play activity.
- Quiz materials (can be paper-based or digital).

This lesson plan is designed to be engaging and informative, providing students with a foundational understanding of one of history's most transformative periods through interactive and creative learning methods.
`;
