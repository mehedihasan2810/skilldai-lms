"use client";
import { buttonVariants } from "@/components/ui";
import { getSummaries } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const RecentSummaryList = ({ userId }: { userId: string }) => {
  const {
    data: summaries,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["summaryList", userId],
    queryFn: async () => await getSummaries({ userId }),
  });

  console.log({ summaries });

  return (
    <div className="mt-16 mb-24">
      <h2 className="text-xl font-semibold mb-3">Recently generated summaries</h2>

      {error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : isLoading ? (
        <div className="flex items-center gap-2">
          <Loader className="size-6 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {summaries?.length === 0 ? (
            <div className="text-muted-foreground">
              You haven&#39;t generated any summary yet!
            </div>
          ) : (
            summaries?.map((summary) => (
              <div
                key={summary.id}
                className="border p-4 rounded-md bg-card text-card-foreground space-y-2"
              >
                <Image
                  className="w-full rounded-md aspect-video"
                  src="/pdf.png"
                  alt="Pdf image"
                  width={300}
                  height={200}
                />
                <h3 className="text-lg font-medium">{summary.summary.slice(0,40)}...</h3>
                <Link
                  href={`/ai-summariser/${summary.id}`}
                  className={buttonVariants({
                    className: "w-full flex items-center gap-2",
                  })}
                >
                  View <ArrowRight className="size-5" />
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
