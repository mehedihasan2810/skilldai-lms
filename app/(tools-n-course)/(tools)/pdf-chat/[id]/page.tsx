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
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }
  return (
    <div className="h-full flex-1">
      <TalkToPDF
        pdfId={params.id}
        userId={user.id}
        userEmail={user.email ?? ""}
      />
    </div>
  );
};

export default Page;
