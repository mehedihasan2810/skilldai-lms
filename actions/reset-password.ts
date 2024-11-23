"use server";

import { action, ActionError } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import {
  resetPasswordSchema,
} from "@/lib/validations/auth";
import { flattenValidationErrors } from "next-safe-action";

async function getSchema() {
  return resetPasswordSchema;
}

export const resetPasswordAction = action
  .metadata({ actionName: "resetPassword" })
  .schema(getSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { password, confirmPassword } }) => {
    const supabase = await createClient();

    if (password !== confirmPassword) {
      throw new ActionError("Passwords do not match");
    }

    const { error, data } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      throw new Error(`Password update failed. Error: ${error.message}`);
    }

    return data;
  });
