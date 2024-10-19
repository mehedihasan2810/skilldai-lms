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

export const deleteChat = async (chatId: string) => {
  const supabase = createClientComponentClient();
  const { data: messageData, error } = await supabase
    .from("messages")
    .delete()
    .eq("chat_id", chatId)
    .select("id");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const { data: chatData, error: chatError } = await supabase
    .from("chats")
    .delete()
    .eq("id", chatId)
    .select("id")
    .single();

  if (chatError) {
    console.error(chatError);
    throw new Error(chatError.message);
  }

  return { messageData, chatData };
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

export const getCourses = async (email: string) => {
  const supabase = createClientComponentClient();
  const { error, data } = await supabase
    .from("courses")
    .select("*")
    // .eq("user_email", email)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const getSectionsByCourseId = async (id: string) => {
  const supabase = createClientComponentClient();
  const { error, data } = await supabase
    .from("course_sections")
    // .select("*")
    .select(
      `
      *,
      course_quizzes (
        id,
        question,
        answer,
        options,
        result
      )
    `
    )
    .eq("course_id", id)
    // .order("created_at", { foreignTable: 'course_sections' });
    .order("created_at");

  console.log("data ", data);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const deleteCourse = async (courseId: string) => {
  const supabase = createClientComponentClient();
  const { data: courseData, error } = await supabase
    .from("courses")
    .delete()
    .eq("id", courseId)
    .select("id")
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return courseData;
};

export const updateSectionCompletion = async (
  userId: string,
  sectionId: string,
  completedUsers: string[]
) => {
  console.log({ userId, sectionId, completedUsers });

  const supabase = createClientComponentClient();
  const { error, data } = await supabase
    .from("course_sections")
    .update({
      completed_users: [userId, ...completedUsers],
    })
    .eq("id", sectionId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const updateQuizResult = async (
  sectionId: string,
  result: Record<string, any>
) => {
  console.log({ sectionId, result });

  const supabase = createClientComponentClient();
  const { error, data } = await supabase
    .from("course_sections")
    .update({
      quizzes_result: result,
    })
    .eq("id", sectionId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};
