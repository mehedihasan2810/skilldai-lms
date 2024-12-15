import { Attachment } from "@/app/types";
import { SupabaseContextType } from "@/lib/supabase/types";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "./supabase/client";
const supabase = createClient();

export const getChats = async (
  // supabase: SupabaseContextType["supabase"],
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
export const getChat = async ({ chatId }: { chatId: string | null }) => {
  const { data, error } = await supabase
    .from("chats")
    .select("id,type")
    .eq("id", chatId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const getChatMessages = async (
  // supabase: SupabaseContextType["supabase"],
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

export const createChat = async ({
  title,
  userId,
  type,
}: // supabase: SupabaseContextType["supabase"],
{
  title: string;
  userId: string | null | undefined;
  type: string;
}) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("chats")
    .insert({
      title,
      user_id: userId,
      type,
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
  // const supabase = createClientComponentClient();
  // const { data: messageData, error } = await supabase
  //   .from("messages")
  //   .delete()
  //   .eq("chat_id", chatId)
  //   .select("id");

  // if (error) {
  //   console.error(error);
  //   throw new Error(error.message);
  // }

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

  return { chatData };
};

export const addMessage = async (
  // supabase: SupabaseContextType["supabase"],
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
  // const supabase = createClientComponentClient();
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
  // const supabase = createClientComponentClient();
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
  // const supabase = createClientComponentClient();
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
  // const supabase = createClientComponentClient();
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
  completedUsers: string[],
  isMarkComplete: boolean,
  courseId: string
) => {
  console.log({ userId, sectionId, completedUsers, isMarkComplete, courseId });

  // const supabase = createClientComponentClient();
  const { error, data } = await supabase
    .from("course_sections")
    .update({
      completed_users: [
        userId,
        ...completedUsers.filter((user) => user !== userId),
      ],
    })
    .eq("id", sectionId)
    .select("id");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  if (isMarkComplete) {
    const { error: coursesError, data: courses } = await supabase
      .from("courses")
      .select("id, completed_users")
      .eq("id", courseId)
      .single();
    // .order("created_at", { ascending: false });

    console.log({ courses });

    if (coursesError) {
      throw new Error(coursesError.message);
    }

    const { error: courseUpdateErr, data: courseUpdateData } = await supabase
      .from("courses")
      .update({
        completed_users: [
          userId,
          ...courses.completed_users.filter((user: string) => user !== userId),
        ],
      })
      .eq("id", courseId)
      .select("id");

    console.log({ courseUpdateErr, courseUpdateData });
  }

  return data;
};

export const updateQuizResult = async (
  sectionId: string,
  result: Record<string, any>
) => {
  console.log({ sectionId, result });

  // const supabase = createClientComponentClient();
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

export const updateCourseStatusInprogress = async (
  courseId: string,
  status: string,
  userId: string
) => {
  console.log({ courseId, status });

  // const supabase = createClientComponentClient();

  const { error: coursesError, data: courses } = await supabase
    .from("courses")
    .select("id, in_progress_users")
    .eq("id", courseId)
    .single();

  console.log({ coursesError, courses });

  if (coursesError) {
    return courses;
  }

  const { error, data } = await supabase
    .from("courses")
    .update({
      in_progress_users: [
        userId,
        ...courses.in_progress_users.filter((user: string) => user !== userId),
      ],
    })
    .eq("id", courseId);
  // .("not_started_users", [userId]);
  // .eq("status", "Not started");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const getCoursesForReports = async () => {
  // const supabase = createClientComponentClient();
  const { error, data } = await supabase
    .from("courses")
    .select(
      `
      id,
      title,
      completed_users,
      in_progress_users,
      not_started_users,
      course_sections (
        id,
        completed_users,
        quizzes_result,
        user_id,
        course_quizzes (
        id,
        answer
        )
      )
    `
    )
    // .eq("id", "a26fbc61-ca47-4d59-9a1b-ed32ad66033b")
    // .eq("user_email", email)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const updateQFDQuizAnswers = async ({
  answersInput,
  quizId,
}: {
  answersInput: string[];
  quizId: string;
}) => {
  console.log({ quizId, answersInput });
  const { error, data } = await supabase
    .from("qfd_quiz")
    .update({
      correct_answers: answersInput,
    })
    .eq("id", quizId);

  if (error) {
    console.log({ error });
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const getQuiz = async ({ quizId }: { quizId: string }) => {
  // const supabase = createClientComponentClient();
  const { error, data } = await supabase
    .from("qfd_quiz")
    // .select("*")
    .select(
      `
    *,
    qfd_questions (
      id,
      quiz_id,
      question,
      answer,
      options
    )
  `
    )
    .eq("id", quizId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const resetQFDQuiz = async ({ quizId }: { quizId: string }) => {
  console.log({ quizId });
  const { error, data } = await supabase
    .from("qfd_quiz")
    .update({
      correct_answers: [],
    })
    .eq("id", quizId);

  if (error) {
    console.log({ error });
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const getQFDQuizzes = async ({
  userId,
}: {
  userId: string | null | undefined;
}) => {
  const { data, error } = await supabase
    .from("qfd_quiz")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const saveUserInfo = async ({
  userId,
  institution,
  profession,
  className,
  section,
  subject,
}: {
  userId: string;
  institution: string;
  profession: string;
  className: string;
  section: string;
  subject: string;
}) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("user_info")
    .upsert(
      {
        user_id: userId,
        institution,
        profession,
        class_name: className,
        section,
        subject,
      },
      { onConflict: "user_id" }
    )
    .select("id")
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Could not save the data");
  }

  console.log({ data });

  return data;
};

export const saveLessonPlan = async ({
  userId,
  title,
  plan,
  topic,
  gradeLevel,
  focusingOn,
  style,
  duration,
  previousLessonInfo,
}: {
  userId: string;
  title: string;
  plan: string;
  topic: string;
  gradeLevel: string;
  focusingOn: string;
  style: string;
  duration: string;
  previousLessonInfo: string;
}) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("lesson_plan")
    .insert({
      title,
      plan,
      user_id: userId,
      topic,
      grade_level: gradeLevel,
      focusing_on: focusingOn,
      style,
      duration,
      previous_lesson_info: previousLessonInfo,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Could not save the data");
  }

  console.log({ data });

  return data;
};

export const getLessonPlan = async ({
  lessonPlanId,
}: {
  lessonPlanId: string;
}) => {
  const { error, data } = await supabase
    .from("lesson_plan")
    .select("*")
    .eq("id", lessonPlanId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const getLessonPlans = async ({ userId }: { userId: string }) => {
  const { error, data } = await supabase
    .from("lesson_plan")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const saveWorksheets = async ({
  userId,
  title,
  worksheets,
  topic,
  gradeLevel,
  numOfQuestions,
}: {
  userId: string;
  title: string;
  worksheets: string;
  topic: string;
  gradeLevel: string;
  numOfQuestions: number;
}) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("worksheets")
    .insert({
      title,
      worksheets,
      user_id: userId,
      topic,
      grade_level: gradeLevel,
      num_of_questions: numOfQuestions,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Could not save the data");
  }

  console.log({ data });

  return data;
};

export const getWorksheet = async ({
  worksheetId,
}: {
  worksheetId: string;
}) => {
  const { error, data } = await supabase
    .from("worksheets")
    .select("*")
    .eq("id", worksheetId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const getWorksheets = async ({ userId }: { userId: string }) => {
  const { error, data } = await supabase
    .from("worksheets")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const saveSummary = async ({
  userId,
  title,
  summary,
  fileName,
  fileUrl,
}: {
  userId: string;
  title: string;
  summary: string;
  fileName: string;
  fileUrl: string;
}) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("ai_summarizer")
    .insert({
      title,
      summary,
      user_id: userId,
      file_name: fileName,
      file_url: fileUrl,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Could not save the data");
  }

  console.log({ data });

  return data;
};

export const getSummary = async ({ summaryId }: { summaryId: string }) => {
  const { error, data } = await supabase
    .from("ai_summarizer")
    .select("*")
    .eq("id", summaryId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const getSummaries = async ({
  userId,
}: {
  userId: string | null | undefined;
}) => {
  const { data, error } = await supabase
    .from("ai_summarizer")
    .select("id,summary")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};
