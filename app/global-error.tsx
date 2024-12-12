"use client";

import { Button, buttonVariants } from "@/components/ui";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="h-screen w-screen grid place-items-center">
          <div className="items-center px-4">
            <h2 className="text-xl font-semibold mb-1">
              Something went wrong!
            </h2>
            <p>Error: {error.message}</p>
            <div>
              <div className="flex items-center gap-2 mt-4">
                <Button onClick={() => reset()}>Try again</Button>
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  href="/new"
                >
                  Go back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
