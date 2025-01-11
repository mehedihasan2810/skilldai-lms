"use client";
import { reportErrorAction } from "@/actions/report-error-via-mail";
import { Button } from "@react-email/components";
import React from "react";

const Page = () => {
  function speak(){
    let utterance = new SpeechSynthesisUtterance("Hello World");
  let voicesArray = speechSynthesis.getVoices();
  utterance.voice = voicesArray[2];
  speechSynthesis.speak(utterance);
}
  return (
    <div>
      <Button
        onClick={() => {
          speak()
        }}
      >
        Click me
      </Button>
    </div>
  );
};

export default Page;
