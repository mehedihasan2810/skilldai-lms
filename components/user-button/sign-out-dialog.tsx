"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui";
import { signOutAction } from "@/actions/auth";
import { SubmitButton } from "../submit-button";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleSignOut: React.MouseEventHandler<HTMLButtonElement>;
};

export const SignOutDialog = ({ open, onOpenChange, handleSignOut }: Props) => {
  const router = useRouter();
  const handleSignOut2 = async () => {
    const supabase = createClient();

    const res = await supabase.auth.signOut();

    if (res.error) throw new Error(res.error.message);

    router.refresh();
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className=""
            onClick={() => {
              toast.promise(handleSignOut2, {
                loading: "Signing out...",
                success: "Signed out successfully",
                error: (error) => error.message,
              });
            }}
          >
            Sign out
          </Button>

          {/* <AlertDialogAction onClick={handleSignOut}>
            Sign Out
          </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
