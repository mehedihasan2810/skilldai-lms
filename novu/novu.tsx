import { Novu } from "@novu/node";

import { createClient } from "@/lib/supabase/server";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const novu = new Novu(process.env.NOVU_SECRET_KEY!);

// Cache to store Novu users (avoid redundant API calls)
const novuUserCache = new Map<string, string>();

// Topic name
const TOPIC_KEY = "all-subscribers";

// Function to fetch the currently logged-in user
export const fetchUser = async () => {
  try {
    const response = await fetch("/api/auth/session");
    const data = await response.json();
    console.log("from novu component ", data);
    return data.user;
  } catch (error) {
    console.error("❌ Error fetching user session:", error);
    return null;
  }
};


// React Query Hook for fetching Supabase user
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1, // Retry once on failure
  });
};

// Function to add user to Novu Topic
const addUserToTopic = async (userId: string) => {
  if (!userId) return;
  try {
    await novu.topics.addSubscribers(TOPIC_KEY, { subscribers: [userId] });
    console.log(`✅ User ${userId} added to topic: ${TOPIC_KEY}`);
  } catch (error) {
    console.error(`❌ Failed to add user ${userId} to topic:`, error);
  }
};

// Create Novu user and add to topic
export const createNovuUser = async (userId: string, email: string) => {
  try {
    await novu.subscribers.get(userId);
    console.log(`✅ User already exists in Novu: ${userId}`);
  } catch {
    await novu.subscribers.identify(userId, { email });
    console.log(`🎉 New Novu user created: ${userId}`);
  }

  novuUserCache.set(userId, email);
  await addUserToTopic(userId);
};

// Get or create Novu user
export const getOrCreateNovuUser = async () => {
  try {
    const user = await fetchUser();
    const userId = user?.id||"";
    const email = user?.email||"" as string;

    if (novuUserCache.has(userId)) return { userId, email };

    try {
      await novu.subscribers.get(userId);
    } catch {
      console.log(`⚠️ User not found in Novu. Creating user: ${userId}`);
      await createNovuUser(userId, email);
    }

    novuUserCache.set(userId, email);
    return { userId, email };
  } catch (error) {
    console.error("❌ Error fetching Novu user:", error);
    throw new Error((error as Error).message);
  }
};

// Function to send notifications to the topic
export async function sendNovuNotification(
  message: { subject: string; body: string },
  isEmail: boolean,
  isInApp: boolean
) {
  try {
    console.log("📢 Sending notification:", message);

    const notificationPayload = {
      to: { type: "Topic", topicKey: "all-subscribers" },
      payload: { subject: message.subject, body: message.body },
    };

    if (isEmail) {
      await axios.post(
        "https://api.novu.co/v1/events/trigger",
        { name: "skilld-email", ...notificationPayload },
        { headers: { Authorization: `ApiKey ${process.env.NOVU_SECRET_KEY!}` } }
      );
      console.log("✅ Email notification sent successfully");
    }

    if (isInApp) {
      await axios.post(
        "https://api.novu.co/v1/events/trigger",
        { name: "skilld-in-app-notifications", ...notificationPayload },
        { headers: { Authorization: `ApiKey ${process.env.NOVU_SECRET_KEY!}` } }
      );
      console.log("✅ In-app notification sent successfully");
    }
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
}
