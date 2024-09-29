import Link from "next/link";
import { Button } from "../ui";
import { EllipsisIcon, Trash } from "lucide-react";
import DeleteChatDialog from "./delete-chat-dialog";

type ChatItemProps = {
  selected: boolean;
  id: string;
  title: string;
};

export const ChatItem = ({ id, title, selected }: ChatItemProps) => {
  return (
    <div
      className={`group cursor-pointer flex items-center gap-2 justify-between px-2 py-1 rounded-md w-full ${
        selected ? "bg-secondary text-secondary-foreground" : ""
      } hover:bg-secondary`}
    >
      <Link href={`/chat/${id}`} className="flex-1 truncate text-sm">
        <span className="flex-1 truncate text-sm">{title}</span>
      </Link>
      <DeleteChatDialog chatId={id} />
      {/* <Button
        className="invisible group-hover:visible w-fit h-fit px-2 py-1 text-rose-500"
        variant="ghost"
        size="icon"
      >
        <Trash className="size-4" />
      </Button> */}
    </div>
  );
};
