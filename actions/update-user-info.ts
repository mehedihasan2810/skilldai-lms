"use server";
import { createClient } from "@/lib/supabase/server";

export const updateUserInfo = async ({
  userId,
  institution,
  profession,
  className,
  section,
  subject,
}: {
  userId: string;
  institution: string;
  profession: string;
  className: string;
  section: string;
  subject: string;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      institution,
      profession,
      class_name: className,
      section,
      subject,
    },
  });

  if (error) {
    return { data: null, error: error.message };
  }

  await supabase.auth.refreshSession();

  return { data, error: null };
};
