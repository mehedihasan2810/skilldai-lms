"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import InterviewItemCard from "./interview-item-card";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const InterviewList = () => {
  const {
    data: interviewList,
    error,
    isPending,
  } = useQuery({
    queryKey: ["mockInterviews"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("mock_interviews")
        .select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      {error ? (
        <div>Error loading interviews: {error.message}</div>
      ) : isPending ? (
        <div>Loading...</div>
      ) : interviewList ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      ) : (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      )}
    </div>
  );
};

export default InterviewList;
