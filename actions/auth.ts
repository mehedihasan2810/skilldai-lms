"use server";

import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signInSchema } from "@/lib/validations/auth";
import { z } from "zod";

export const signInAction = async (values: z.infer<typeof signInSchema>) => {
  try {
    const result = signInSchema.safeParse({
      email: values.email,
      password: values.password,
    });

    if (!result.success) {
      throw new Error(result.error.message);
    }

    const { email, password } = result.data;

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const signUpAction = async (values: z.infer<typeof signInSchema>) => {
  try {
    const result = signInSchema.safeParse({
      email: values.email,
      password: values.password,
    });

    if (!result.success) {
      throw new Error(result.error.message);
    }

    const { email, password } = result.data;

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  console.log({ email, origin, callbackUrl });

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/api/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/reset-password", "Passwords do not match");
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", "/reset-password", "Password update failed");
  }

  redirect("/new");
  // encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/", "layout");
};
