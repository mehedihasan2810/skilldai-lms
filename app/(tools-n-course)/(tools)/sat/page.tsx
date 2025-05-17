// app/quiz/page.tsx (Server Component)
import { notFound } from "next/navigation";
import Home from "./home";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
  

  // Pass the validated params to the client component
  return <Home userId={user.id} userEmail={user.email ?? ""}/>;
}