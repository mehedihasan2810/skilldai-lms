// app/quiz/page.tsx (Server Component)
import { notFound } from "next/navigation";
import QuizClient from "./quiz-client";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { generateUUID } from "@/lib/utils";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const subject = searchParams.subject;
  const proficiency = searchParams.proficiency;
    const supabase = await createClient();
  
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (!session) {
      return redirect("/");
    }
  
    const user = session.user;
  
    const id = generateUUID();

  // Validate that subject and proficiency are provided
  if (!subject || !proficiency) {
    notFound(); // Redirect to 404 if parameters are missing
  }

  // Pass the validated params to the client component
  return <QuizClient chatId={id} subject={subject} proficiency={proficiency} userId={user.id} userEmail={user.email ?? ""}/>;
}