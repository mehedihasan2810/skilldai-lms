import { NextResponse } from "next/server";
import { sendNovuNotification } from "@/novu/novu";

export async function POST(req: Request) {
  try {
    let body;
    
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { message, isEmail, isInApp } = body;

    // Validate message
    if (!message || !message.subject || !message.body) {
      return NextResponse.json({ error: "Missing required message fields" }, { status: 400 });
    }

    // Ensure at least one notification method is selected
    if (!isEmail && !isInApp) {
      return NextResponse.json({ error: "At least one notification method must be enabled (isEmail or isInApp)" }, { status: 400 });
    }

    // Sending notification
    await sendNovuNotification(message, isEmail, isInApp);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error in notification route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
