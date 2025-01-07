"use client";
import { reportErrorAction } from "@/actions/report-error-via-mail";
import { Button } from "@react-email/components";
import React from "react";

const Page = () => {
  return (
    <div>
      <Button
        onClick={() => {
          reportErrorAction({
            userEmail: "test@gmail.com",
            errorMessage: "Unknown",
            errorTrace: "Unknown",
            errorSourceUrl: "Unknown",
          });
        }}
      >
        Click me
      </Button>
    </div>
  );
};

export default Page;
