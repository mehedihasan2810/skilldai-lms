"use client";

import { courseSchema } from "@/app/api/generate-course/schema";
import { Button } from "@/components/ui";
import { experimental_useObject as useObject } from "ai/react";
import React from "react";

const Page = () => {
  const { submit, isLoading, object, stop, error } = useObject({
    api: "/api/generate-course",
    schema: courseSchema,
    onError: (error) => {
      console.log("Error");
      console.log({ error });
    },
    onFinish({ object }) {
      console.log("Finish");
      console.log({ object });
    },
  });

  console.log({ isLoading });
  console.log(object);

  return (
    <div className="max-w-7xl mx-auto">
      <Button
        onClick={() =>
          submit({
            courseTopic: "css",
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
