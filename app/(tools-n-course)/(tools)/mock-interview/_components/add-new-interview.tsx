"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveMockInterviewQNA } from "@/lib/db";
import { toast } from "sonner";

const AddNewInterview = ({ userId }: { userId: string }) => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const router = useRouter();

  const queryClient = useQueryClient();

  const saveMockInterviewQNAMutation = useMutation({
    mutationFn: async ({
      jobPosition,
      jobDesc,
      jobExperience,
      userId,
    }: {
      jobPosition: string;
      jobDesc: string;
      jobExperience: string;
      userId: string;
    }) =>
      await saveMockInterviewQNA({
        jobPosition,
        jobDesc,
        jobExperience,
        userId,
      }),
  });

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log({ jobPosition, jobDesc, jobExperience });

    saveMockInterviewQNAMutation.mutate(
      {
        jobPosition,
        jobDesc,
        jobExperience,
        userId,
      },
      {
        onSuccess: async (data) => {
          console.log("Interview saved successfully:", data);
          await queryClient.invalidateQueries({ queryKey: ["mockInterviews"] });
          setOpenDialog(false);
          router.push(`/mock-interview/${data.id}`);
        },
        onError: (error) => {
          console.error("Error during mutation:", error);
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <Dialog open={openDailog} onOpenChange={(v) => setOpenDialog(v)}>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
          className:
            "py-16 px-36 rounded-lg border transition-all cursor-pointer w-full",
        })}
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg flex items-center justify-center gap-2">
          <Plus className="" /> Add New
        </h2>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Tell us more about your job interviwing
          </DialogTitle>
          <DialogDescription>
            Add Details about your job position, job descritpion and years of
            experience
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="my-3">
            <div className="mt-7 my-3">
              <label className="mb-2 text-foreground inline-block">
                Job Role/job Position
              </label>
              <Input
                className="mt-1"
                placeholder="Ex. Full stack Developer, Sales Head, Lawyer"
                required
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="mb-2 text-foreground inline-block">
                Job Description/ Tech stack (In Short)
              </label>
              <Textarea
                className="placeholder-opacity-50"
                placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python, Sales, Legal, Marketing"
                required
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="mb-2 text-foreground inline-block">
                Years of Experience
              </label>
              <Input
                className="mt-1"
                placeholder="Ex. 5"
                max="50"
                type="number"
                required
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-5 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saveMockInterviewQNAMutation.isPending}
              className="flex items-center gap-2"
            >
              {saveMockInterviewQNAMutation.isPending ? (
                <>
                  <Loader className="size-5 animate-spin" />
                  Please wait
                </>
              ) : (
                "Start Interview"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewInterview;
