"use client";
import React from "react";
import { buttonVariants } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { getWorksheets } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const WorksheetsList = ({ userId }: { userId: string }) => {
  const {
    data: worksheets,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["worksheets"],
    queryFn: async () => await getWorksheets({ userId }),
  });
  return (
    <div className="mb-16 mt-16">
      <h2 className="text-xl font-semibold mb-2">
        Your recently generated worksheets
      </h2>

      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {worksheets?.length === 0 ? (
            <p className="text-muted-foreground">
              You haven&#39;t generated any worksheets yet!
            </p>
          ) : (
            worksheets?.map((worksheet) => (
              <div
                className="border bg-card text-card-foreground p-4 rounded-md flex flex-col"
                key={worksheet.id}
              >
                <div className="grow">
                  <h3 className="text-lg font-semibold">{worksheet.title}</h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge>{worksheet.topic}</Badge>
                    {worksheet.grade_level && (
                      <Badge>{worksheet.grade_level}</Badge>
                    )}
                  </div>
                </div>

                <Link
                  className={buttonVariants({ className: "w-full mt-4" })}
                  href={`/worksheet-generator/${worksheet?.id}`}
                >
                  View Worksheet
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
