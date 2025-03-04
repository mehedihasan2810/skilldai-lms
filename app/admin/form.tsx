"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotificationForm() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isInApp, setIsInApp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/novu/sendNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: { subject, body },
          isEmail,
          isInApp,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Notification sent successfully!");
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl w-full p-8 shadow-lg rounded-lg text-white border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
        Admin - Send Notification
      </h2>

      {message && (
        <div
          className={cn(
            "p-3 mb-4 text-sm rounded-lg text-center",
            message.includes("✅")
              ? "bg-green-700 text-green-100"
              : "bg-red-700 text-red-100"
          )}
        >
          {message}
        </div>
      )}

      <form onSubmit={sendNotification} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-300 mb-1">Subject</label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-300 mb-1">Message Body</label>
          <Textarea
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-gray-300">
            <Checkbox checked={isInApp} onCheckedChange={(checked) => setIsInApp(checked === true)} />
            <span>Email Notification</span>
          </label>

          <label className="flex items-center space-x-2 text-gray-300">
            <Checkbox checked={isEmail} onCheckedChange={(checked) => setIsEmail(checked === true)} />
            <span>In-App Notification</span>
          </label>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Notification"}
        </Button>
      </form>
    </Card>
  );
}
