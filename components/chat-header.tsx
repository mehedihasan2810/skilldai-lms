import ChatMobileSidebar from "./side-navbar/chat-mobile-sidebar";
import { UserButton } from "./user-button";

export const ChatHeader = () => {
  return (
    <div className="absolute z-50 bg-background p-4 top-0 w-full border-b justify-between flex sm:hidden">
      <div>
        {" "}
        <ChatMobileSidebar />
      </div>

      <div>
        <UserButton />
      </div>
    </div>
  );
};
