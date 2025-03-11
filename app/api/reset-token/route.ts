import { createClient } from "@/lib/supabase/server";

export const GET = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("token_usage")
    .update({ total_tokens: 0, input_token: 0, output_token: 0 })
    .neq("id", "4162c9fc-b3a1-47bf-bbb2-a8ccd3d903c7");
  // console.log({ data, error });

  return Response.json({ message: "Token reset" });
};
