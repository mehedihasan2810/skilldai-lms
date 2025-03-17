"use server";
import { createClient } from "@/lib/supabase/server";

export const refreshSession = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.refreshSession();
    console.log({ data, error });
    if (error) {
      throw new Error(error.message);
    }
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: (error as Error).message };
  }
};
