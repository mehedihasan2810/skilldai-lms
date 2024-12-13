"use server";

import { revalidatePath } from "next/cache";

export const revalidateSetupForm = async () => {
  revalidatePath("/", "layout");
};
