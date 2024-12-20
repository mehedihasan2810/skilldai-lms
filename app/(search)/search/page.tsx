import { createClient } from "@/lib/supabase/server";
import { HomeContent } from "./_components/search-page";
import { redirect } from "next/navigation";

const Home = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return <HomeContent userEmail={user.email ?? ""} userId={user.id} />;
};

export default Home;
