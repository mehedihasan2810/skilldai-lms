import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
  

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    // Now the column name should match correctly
    const { data, error } = await supabase
      .from("admins")
      .select("email") // Match the new column name
      .eq("email", email);

  

    if (error) throw error;

    // If data is not empty, the user is an admin
    const isAdmin = data.length > 0;

    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
