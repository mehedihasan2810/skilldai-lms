import { Novu } from "@novu/node";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";

const novu = new Novu(process.env.NOVU_SECRET_KEY as string);

// Cache to store Novu users (avoid redundant API calls)
const novuUserCache = new Map<string, string>();

// Topic name
const TOPIC_KEY = "all-subscribers";

// Function to get the currently logged-in user from Supabase
export const getLoggedInUser = async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Failed to fetch user from Supabase.");
  return user;
};

// Function to add user to Novu Topic
const addUserToTopic = async (userId: string) => {
  if (!userId) return; // Avoid adding empty users

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
    // Check if the user already exists
    await novu.subscribers.get(userId);
    console.log(`✅ User already exists in Novu: ${userId}`);
  } catch {
    // If user doesn't exist, create them in Novu
    await novu.subscribers.identify(userId, { email });
    console.log(`🎉 New Novu user created: ${userId}`);
  }

  // Store user in cache
  novuUserCache.set(userId, email);

  // Add user to "all-subscribers" topic
  await addUserToTopic(userId);
};

// Get or create Novu user
export const getOrCreateNovuUser = async () => {
  try {
    const user = await getLoggedInUser();
    const userId = user.id;
    const email = user.email as string;

    if (novuUserCache.has(userId)) return { userId, email };

    // Ensure the user exists in Novu
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
    console.log(message)

    if (isEmail) {
      try {
        axios.post("https://api.novu.co/v1/events/trigger", {
          name: "skilld-email",  // Make sure this event name exists in Novu workflows
          to: { type: "Topic", topicKey: "all-subscribers" }, 
          payload: { subject:message.subject,body:message.body }
        }, {
          headers: { Authorization: `ApiKey ${process.env.NOVU_SECRET_KEY as string}` }
        })
        .then(response => console.log("Notification sent:", response.data))
        .catch(error => console.error("Error sending notification:", error.response?.data || error.message));
      } catch (error) {
        console.error("❌ Failed to send email notification:", error);
      }
    }

    if (isInApp) {
      try {
        axios.post("https://api.novu.co/v1/events/trigger", {
          name: "skilld-in-app-notifications",  // Make sure this event name exists in Novu workflows
          to: { type: "Topic", topicKey: "all-subscribers" }, 
          payload: { subject:message.subject,body:message.body }
        }, {
          headers: { Authorization: `ApiKey ${process.env.NOVU_SECRET_KEY as string}` }
        })
        .then(response => console.log("Notification sent:", response.data))
        .catch(error => console.error("Error sending notification:", error.response?.data || error.message));
      } catch (error) {
        console.error("❌ Failed to send in-app notification:", error);
      }
    }
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
}
