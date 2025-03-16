"use server";
import { createClient } from "@/lib/supabase/server";

export const refreshSession = async () => {
  const supabase = await createClient();
  await supabase.auth.refreshSession();
};
