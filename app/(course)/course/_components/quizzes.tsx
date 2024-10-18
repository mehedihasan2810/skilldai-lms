import { Button } from "@/components/ui";
import React from "react";

export const Quizzes = () => {
  return (
    <div className="bg-secondary text-secondary-foreground p-6 rounded-md space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-background text-foreground rounded-md p-6">
          <div className="flex items-center gap-4 font-semibold mb-4 text-lg">
            1. Test your knowledge and see what you’ve just learned?
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="bg-secondary text-secondary-foreground p-4 border-b flex items-center gap-3 hover:bg-secondary/50">
              <div className="size-8 rounded-full flex justify-center items-center bg-sky-800 text-sky-300 text-lg">
                A
              </div>
              Test your knowledge and see what you’ve just learned.
            </div>
            <div className="bg-secondary text-secondary-foreground p-4 border-b flex items-center gap-3 hover:bg-secondary/50">
              <div className="size-8 rounded-full flex justify-center items-center bg-sky-800 text-sky-300 text-lg">
                A
              </div>
              Test your knowledge and see what you’ve just learned.
            </div>
            <div className="bg-secondary text-secondary-foreground p-4 border-b flex items-center gap-3 hover:bg-secondary/50">
              <div className="size-8 rounded-full flex justify-center items-center bg-sky-800 text-sky-300 text-lg">
                A
              </div>
              Test your knowledge and see what you’ve just learned.
            </div>
            <div className="bg-secondary text-secondary-foreground p-4 border-b flex items-center gap-3 hover:bg-secondary/50">
              <div className="size-8 rounded-full flex justify-center items-center bg-sky-800 text-sky-300 text-lg">
                A
              </div>
              Test your knowledge and see what you’ve just learned.
            </div>
          </div>
        </div>
      ))}

      <Button className="w-full" size="lg">
        Check Answer
      </Button>
    </div>
  );
};

