import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AccessPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  if (user.user_metadata.permission == "granted") {
    return redirect("/new");
  }

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

        <p className="text-sm text-muted-foreground pt-4">
          If you need immediate assistance or have questions about your account
          status, please contact our support team at{" "}
          <Link
            href="mailto:hello@skilld.team"
            className="text-primary hover:underline"
          >
            hello@skilld.team
          </Link>
        </p>
      </div>
    </div>
  );
}
