import { Attachment } from "@/app/types";
import { SupabaseContextType } from "@/lib/supabase/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getChats = async (
  supabase: SupabaseContextType["supabase"],
  userId: string | null | undefined
) => {
  if (!userId) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const getChatMessages = async (
  supabase: SupabaseContextType["supabase"],
  id: string | null
) => {
  if (!id) return [];

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", id)
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const createChat = async (
  supabase: SupabaseContextType["supabase"],
  title: string,
  userId: string | null | undefined
) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("chats")
    .insert({
      title,
      user_id: userId,
    })
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Could not create chat");
  }

  return data[0];
};

export const addMessage = async (
  supabase: SupabaseContextType["supabase"],
  chatId: string | null,
  message: { role: string; content: string; metadata?: Record<string, any> },
  attachments: Attachment[] = []
) => {
  console.log({ chatId, attachments });

  if (!chatId) return message;

  const { error } = await supabase.from("messages").insert({
    chat_id: chatId,
    role: message.role,
    text: message.content,
    attachments,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return message;
};

export const addFeedback = async (feedback: string, email: string) => {
  const supabase = createClientComponentClient();
  const { error, data } = await supabase
    .from("feedback")
    .insert({
      feedback,
      sender_email: email,
    })
    .select("id");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};
