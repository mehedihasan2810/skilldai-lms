import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/formate-date";
import Link from "next/link";

// @ts-expect-error: Unreachable code error
const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  return (
    <div className="border border-gray-500 shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview.job_position}</h2>
      <h2 className="text-sm text-gray-600">
        {interview.job_experience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At:{formatDate(interview.created_at)}
      </h2>

      <div className="flex justify-between mt-2 gap-5 ">
        <Link
          className={buttonVariants()}
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
