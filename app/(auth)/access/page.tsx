import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react"; // Changed icon to represent pending approval
import { createClient } from "@/lib/supabase/server";
import { RefreshButton } from "./components/refresh-button";
  
export default async function AccessPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex justify-center">
          <ClipboardCheck className="h-16 w-16 text-amber-500" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Account Pending Approval
        </h1>

        <p className="text-muted-foreground">
          Your account is currently awaiting approval from our administrators.
        </p>

        <RefreshButton />

        {/* <div className="bg-muted/50 p-4 rounded-md">
          <p className="text-sm text-muted-foreground">
            This process typically takes 1-2 business days. You&apos;ll receive an email notification 
            once your account has been approved.
          </p>
        </div> */}

        {/* <div className="flex flex-col space-y-3 pt-4">
          <Button asChild variant="default">
            <Link href="/">Return to Home</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="mailto:support@example.com">Contact Support</Link>
          </Button>
        </div> */}

        <p className="text-sm text-muted-foreground pt-4">
          If you need immediate assistance or have questions about your account
          status, please contact our support team at{" "}
          <a
            href="mailto:support@example.com"
            className="text-primary hover:underline"
          >
            support@example.com
          </a>
        </p>

      </div>
    </div>
  );
}
