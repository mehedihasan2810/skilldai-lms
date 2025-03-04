// app/api/auth/session/route.ts (for App Router)
// pages/api/auth/session.ts (for Pages Router)

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
console.log(data.session?.user)
  return NextResponse.json({ user: data.session?.user });
}
