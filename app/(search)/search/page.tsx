import { createClient } from "@/lib/supabase/server";
import { HomeContent } from "./_components/search-page";
import { redirect } from "next/navigation";

const Home = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  return <HomeContent userEmail={user.email ?? ""} userId={user.id} />;
};

export default Home;
