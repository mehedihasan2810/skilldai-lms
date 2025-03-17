"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutDialog } from "./sign-out-dialog";
import { UserIcon } from "lucide-react";
import { useState } from "react";
// import { useSupabase } from "@/lib/supabase";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "nextjs-toploader/app";
import { buttonVariants } from "../ui";
import { signOutAction } from "@/actions/auth";
import { toast } from "sonner";
import { revalidateServerData } from "@/actions/revalidate-server-data";
type Props = {
  expanded?: boolean;
  userEmail?: string;
};

export const UserButton = ({ expanded = false, userEmail }: Props) => {
  const router = useRouter();

  // const { supabase, session } = useSupabase();

  const [isSignoutDialogOpen, setIsSignoutDialogOpen] = useState(false);

  const handleOpenSignoutDialog = () => setIsSignoutDialogOpen(true);
  const handleCloseSignoutDialog = () => setIsSignoutDialogOpen(false);

  const handleSignOut = async () => {
    const supabase = createClient();

    const res = await supabase.auth.signOut();

    if (res.error) throw new Error(res.error.message);

    await revalidateServerData();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: "outline",
            size: "icon",
            className:
              "size-10 p-2 border flex justify-center items-center rounded hover:bg-secondary",
          })}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <UserIcon className="w-full" />
              </TooltipTrigger>
              <TooltipContent side="right">User</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="truncate" title={userEmail}>
            {userEmail}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              toast.promise(handleSignOut, {
                loading: "Signing out...",
                success: "Signed out successfully",
                error: (error) => error.message,
              });
            }}
            className="cursor-pointer"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog
        open={isSignoutDialogOpen}
        onOpenChange={setIsSignoutDialogOpen}
        handleSignOut={handleSignOut}
      />
    </>
  );
};
