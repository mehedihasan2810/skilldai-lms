import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const GET = async () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase
    .from("token_usage")
    .update({ total_tokens: 0 })
    .neq("id", "4162c9fc-b3a1-47bf-bbb2-a8ccd3d903c7");
  // console.log({ data, error });

  return Response.json({ message: "Token reset" });
};
