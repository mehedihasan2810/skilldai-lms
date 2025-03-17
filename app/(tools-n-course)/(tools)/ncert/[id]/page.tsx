import React from "react";
import { TalkToPDF } from "./_components/pdf-chat-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Page = async (
  props: {
    params: Promise<{
      id: string;
    }>;
  }
) => {
  const params = await props.params;
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  return (
    <div className="p-4 h-full">
      <TalkToPDF
        pdfId={params.id}
        userId={user.id}
        userEmail={user.email ?? ""}
      />
    </div>
  );
};

export default Page;
