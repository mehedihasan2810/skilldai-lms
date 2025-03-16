"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const revalidateServerData = async () => {
 
  revalidatePath("/", "layout");
};