import React from "react";
import AddNewInterview from "./_components/add-new-interview";
import InterviewList from "./_components/interview-list";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const userId = session.user.id;

  return (
    <div className="p-10 flex-1">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and start your AI Mockup Interview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview userId={userId} />
      </div>

      <InterviewList />
    </div>
  );
};

export default Page;
