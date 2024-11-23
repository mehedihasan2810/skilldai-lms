"use server";

import { action, ActionError } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { signInSchema } from "@/lib/validations/auth";
import {
  flattenValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { z } from "zod";

async function getSchema() {
  return signInSchema
}

export const signInUser = action
  .metadata({ actionName: "signInUser" })
  .schema(getSchema, {

    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    console.log({ email, password });

    const supabase = await createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new ActionError(error.message);
    }

    return data;

    // returnValidationErrors(getSchema, {
    //   email: {
    //     _errors: ["incorrect_credentials"],
    //   },
    // });
  });
