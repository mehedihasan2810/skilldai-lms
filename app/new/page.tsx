import { ChatHeader } from "@/components/chat-header";
import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const NewChatPage = async () => {
  const supabase = await createClient();

  // await supabase.auth.refreshSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  console.log(user);
  if (user.user_metadata.permission !== "granted") {
    return redirect("/access");
  }

  // if (user.user_metadata.permission === "denied") {
  //   return redirect("/si");
  // }

  return (
    <div className="relative isolate size-full">
      <ChatHeader userId={user.id} email={user.email!} />
      <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden">
        <SideNavBar userId={user.id} userEmail={user.email ?? ""} />
        <ChatPanel id={null} userEmail={user.email ?? ""} userId={user.id} />
      </div>
    </div>
  );
};

export default NewChatPage;
