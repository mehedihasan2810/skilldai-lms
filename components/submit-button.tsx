"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="flex items-center"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      {...props}
    >
      {pending ? (
        <>
          {" "}
          <Loader className="size-5 animate-spin mr-2" /> {pendingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
