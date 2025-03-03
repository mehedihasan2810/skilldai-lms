import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/novu/novu";

export async function GET() {
  try {
    const user = await getLoggedInUser(); // Make sure this returns an object

    if (!user || !user.id || !user.email) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ id: user.id, email: user.email }); // ✅ Proper object format
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
