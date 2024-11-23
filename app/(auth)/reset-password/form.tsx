import { resetPasswordAction } from "@/actions/auth";
import { FormMessage, Message } from "@/components/signin-form-message";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export async function ResetPasswordForm({ message }: { message: Message }) {
  return (
    <Card className="max-w-md w-full border">
    <CardHeader>
      <CardTitle>Reset Password</CardTitle>
      <CardDescription>
      Please enter your new password below.
      </CardDescription>
    </CardHeader>

    <CardContent>
    <form className="space-y-4">
     <div className="space-y-1">
      <Label htmlFor="password" >New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      </div>
      <div className="space-y-1">
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      </div>
      <SubmitButton className="w-full" pendingText="Resetting Password..." formAction={resetPasswordAction}>
        Reset password
      </SubmitButton>
      <FormMessage message={message} />
    </form>
    </CardContent>
    </Card>
  );
}
