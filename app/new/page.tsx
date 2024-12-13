import { ChatHeader } from "@/components/chat-header";
import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const NewChatPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  // const { error, data } = await supabase
  //   .from("user_info")
  //   .select("id,profession")
  //   .eq("user_id", user.id)
  //   .single();

  // if (
  //   error?.message === "JSON object requested, multiple (or no) rows returned"
  // ) {
  //   console.error(error);
  //   return redirect("/setup");
  // }

  // if (error) {
  //   console.error(error);
  //   throw new Error(error.message);
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
