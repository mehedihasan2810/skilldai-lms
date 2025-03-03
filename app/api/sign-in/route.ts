import { createClient } from "@/lib/supabase/server";

export const POST = async (req: Request) => {
  try {
    const { email, password }: { email: string; password: string } =
      await req.json();
    console.log({ email, password });
    const supabase = await createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    if (data.user) {
      // Ensure Novu user exists when user logs in
      await fetch("/api/novu/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: data.user.id, email: data.user.email }),
      });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ message: (error as Error).message });
  }
};
