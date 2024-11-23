"use server";

import { action, ActionError } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";
const setPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
  refreshToken: z.string().trim().min(1, { message: "Refresh token missing" }),
  // confirmPassword: z
  //   .string()
  //   .trim()
  //   .min(8, { message: "Password must contain at least 8 character(s)" }),
});

async function getSchema() {
  return setPasswordSchema;
}

export const setPasswordAction = action
  .metadata({ actionName: "setPassword" })
  .schema(getSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { password, refreshToken } }) => {
    console.log({ password, refreshToken });
    const supabase = await createClient();

    const { error, data } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      throw new ActionError(error.message);
    }

    const { data: userData, error: userError } = await supabase.auth.updateUser(
      { password: password }
    );

    if (userError) {
      throw new ActionError(userError.message);
    }

    return userData;
  });
