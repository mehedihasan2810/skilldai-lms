import React from "react";
import { TalkToPDF } from "./_components/pdf-chat-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }
  return (
    <div className="h-full flex-1">
      <TalkToPDF
        pdfId={params.id}
        userId={session.user.id}
        userEmail={session.user.email ?? ""}
      />
    </div>
  );
};

export default Page;
