// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function GET(request: Request) {
//   // The `/auth/callback` route is required for the server-side auth flow implemented
//   // by the Auth Helpers package. It exchanges an auth code for the user's session.
//   // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   // if "next" is in param, use it as the redirect URL
//   const next = searchParams.get("next") ?? "/";

//   if (code) {
//     const supabase = await createClient()
//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       return NextResponse.redirect(`${origin}${next}`);
//     }
//   }

//   // URL to redirect to after sign in process completes
//   return NextResponse.redirect(origin);
// }


import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    const user = await supabase.auth.getUser();

    if (user.data.user?.user_metadata.permission === "granted") {
      return NextResponse.redirect(`${origin}/new`);
    }
  }

 

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/new`);
}