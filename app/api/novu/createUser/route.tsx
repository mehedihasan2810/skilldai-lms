import { NextResponse } from "next/server";
import { createNovuUser, getOrCreateNovuUser } from "@/novu/novu";

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();
    
    if (!userId || !email) {
      return NextResponse.json({ error: "Missing userId or email" }, { status: 400 });
    }

    // Create user in Novu
    await createNovuUser(userId, email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId, email } = await getOrCreateNovuUser();

    return NextResponse.json({ userId, email });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

