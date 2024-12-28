"use client";
import { buttonVariants } from "@/components/ui";
import { getAllPDFInfo } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const RecentPDFList = ({ userId }: { userId: string }) => {
  const {
    data: pdfs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pdfChatList", userId],
    queryFn: async () => await getAllPDFInfo({ userId }),
  });

  console.log({ pdfs });

  return (
    <div className="mt-16 mb-24">
      <h2 className="text-xl font-semibold mb-3">Recents</h2>

      {error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : isLoading ? (
        <div className="flex items-center gap-2">
          <Loader className="size-6 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {pdfs?.length === 0 ? (
            <div className="text-muted-foreground">No data found!</div>
          ) : (
            pdfs?.map((pdfData) => (
              <div
                key={pdfData.id}
                className="border p-4 rounded-md bg-card text-card-foreground space-y-2"
              >
                <Image
                  className="w-full rounded-md aspect-video"
                  src="/pdf.png"
                  alt="Pdf image"
                  width={300}
                  height={200}
                />
                <h3 className="text-lg font-medium">{pdfData.title}</h3>
                <Link
                  href={`/pdf-chat/${pdfData.id}`}
                  className={buttonVariants({
                    className: "w-full flex items-center gap-2",
                  })}
                >
                  Chat <ArrowRight className="size-5" />
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
