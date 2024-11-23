"use server";

import { action, ActionError } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { forgotPasswordSchema, signInSchema } from "@/lib/validations/auth";
import { flattenValidationErrors } from "next-safe-action";
import { headers } from "next/headers";

async function getSchema() {
  return forgotPasswordSchema;
}

export const forgotPasswordAction = action
  .metadata({ actionName: "forgotPassword" })
  .schema(getSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { email } }) => {
    console.log({ email });

    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    // const callbackUrl = formData.get("callbackUrl")?.toString();

    console.log({ email, origin });

    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/api/auth/callback?redirect_to=/reset-password`,
    });

    if (error) {
      console.error(error.message);
      throw new ActionError(error.message);
    }

    return data;
  });
