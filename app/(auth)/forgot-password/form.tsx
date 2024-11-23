import { forgotPasswordAction } from "@/actions/auth";
import { FormMessage, Message } from "@/components/signin-form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
// import { SmtpMessage } from "../smtp-message";

export async function ForgotPasswordForm({ message }: { message: Message }) {
  return (
    <Card className="max-w-md w-full border">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          {" "}
          Already have an account?{" "}
          <Link className="text-primary underline" href="/signin">
            Sign in
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          {/* <div>
            <h1 className="text-2xl font-medium">Reset Password</h1>
            <p className="text-sm text-secondary-foreground">
              Already have an account?{" "}
              <Link className="text-primary underline" href="/sign-in">
                Sign in
              </Link>
            </p>
          </div> */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="Enter your email..." required />
            </div>
            <SubmitButton
              pendingText="Resetting Password..."
              className="w-full"
              formAction={forgotPasswordAction}
            >
              Reset Password
            </SubmitButton>
            <FormMessage message={message} />
          </div>
        </form>
        {/* <SmtpMessage /> */}
      </CardContent>
    </Card>
  );
}
