import React from "react";
import { ChatPanel } from "./_components/chat-panel";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { generateUUID } from "@/lib/utils";

export default async function Serenity() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  const id = generateUUID();

  return <ChatPanel id={id} userEmail={user.email ?? ""} userId={user.id} />;
}
