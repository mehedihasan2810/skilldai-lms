import { ChatPanel } from "@/components/chat/panel";
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

  const user = session.user;

 

  // if (user.user_metadata.permission === "denied") {
  //   return redirect("/si");
  // }

  return (
    <div className="relative isolate size-full">
      {/* <ChatHeader userId={user.id} email={user.email!} /> */}
      <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden">
        hello
        {/* <SideNavBar userId={user.id} userEmail={user.email ?? ""} /> */}
        {/* <ChatPanel id={null} userEmail={user.email ?? ""} userId={user.id} /> */}
      </div>
    </div>
  );
};

export default Page;
