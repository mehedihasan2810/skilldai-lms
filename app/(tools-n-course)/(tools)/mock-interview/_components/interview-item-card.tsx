import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/formate-date";
import Link from "next/link";

// @ts-expect-error: Unreachable code error
const InterviewItemCard = ({ interview }) => {
  return (
    <div className="bg-card shadow-md p-4 rounded-md border">
      <h2 className="text-lg font-bold mb-2">{interview.job_position}</h2>
      <p className="">{interview.job_experience} Years of experience</p>
      <p className="text-muted-foreground mt-2 text-sm">
        {formatDate(interview.created_at)}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={`/mock-interview/${interview.id}/feedback`}
        >
          Feedback
        </Link>
        <Link
          href={`/mock-interview/${interview.id}`}
          className={buttonVariants()}
        >
          Start
        </Link>
      </div>
    </div>
  );
};

export default InterviewItemCard;
