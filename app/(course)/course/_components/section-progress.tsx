import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

export const SectionProgress = ({
  sectionsLength,
  userId,
  completedSections,
}: {
  sectionsLength: number;
  userId: string;
  completedSections: number;
}) => {
  // const completedSections = completedSections.filter(id => id === userId)

  const percentage = (completedSections / sectionsLength) * 100;


  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <div>{parseInt(String(percentage))}%</div>
        <div className="text-sm text-muted-foreground">
          {completedSections}/{sectionsLength} chapters
        </div>
      </div>
      <div className="size-8">
        <CircularProgressbar value={percentage} strokeWidth={12} />
      </div>
    </div>
  );
};
