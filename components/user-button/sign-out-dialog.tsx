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

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleSignOut: React.MouseEventHandler<HTMLButtonElement>;
};

export const SignOutDialog = ({ open, onOpenChange, handleSignOut }: Props) => {
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
          <form>
            <SubmitButton
              className="w-full"
              pendingText="Signing out..."
              formAction={signOutAction}
            >
              Sign out
            </SubmitButton>
          </form>

          {/* <AlertDialogAction onClick={handleSignOut}>
            Sign Out
          </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
