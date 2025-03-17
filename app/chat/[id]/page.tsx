import { ChatHeader } from "@/components/chat-header";
import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";
import { createClient } from "@/lib/supabase/server";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props) => {
  return (
    <div className="relative isolate size-full">
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center gap-2">
            <Loader className="size-6 animate-spin" /> Please wait...
          </div>
        }
      >
        <Chat chatId={id} />
      </Suspense>
    </div>
  );
};

const Chat = async ({ chatId }: { chatId: string }) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  if (user.user_metadata.permission !== "granted") {
    return redirect("/access");
  }

  return (
    <>
      <ChatHeader userId={user.id} email={user.email!} />
      <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden">
        <SideNavBar userId={user.id} userEmail={user.email ?? ""} />
        <ChatPanel id={chatId} userEmail={user.email ?? ""} userId={user.id} />
      </div>
    </>
  );
};

export default ChatPage;
