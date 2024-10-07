"use client";

import { courseSchema } from "@/app/api/generate-course/schema";
import { Button } from "@/components/ui";
import { experimental_useObject as useObject } from "ai/react";
import React from "react";

const Page = () => {
  const { submit, isLoading, object, stop, error } = useObject({
    api: "/api/generate-course",
    schema: courseSchema,
  });

  console.log({ isLoading, error });
  console.log(object);

  return (
    <div className="max-w-7xl mx-auto">
      <Button
        onClick={() =>
          submit({
            courseTopic: "html",
            targetAudience: "developer",
            difficultyLevel: "beginner",
          })
        }
      >
        Submit
      </Button>
    </div>
  );
};

export default Page;
