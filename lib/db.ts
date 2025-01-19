import { Attachment } from "@/app/types";
import { SupabaseContextType } from "@/lib/supabase/types";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "./supabase/client";
import { generateQuizTitle } from "@/actions/generate-quiz-title";
import { getQueryClient } from "@/app/react-query-provider";
import { shortUid } from "./utils";
import axios from "axios";

const supabase = createClient();

const queryClient = getQueryClient();

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
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

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
  difficulty,
  numOfQuestions,
}: {
  userId: string;
  title: string;
  worksheets: string;
  topic: string;
  gradeLevel: string;
  difficulty: string;
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
      difficulty,
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
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const savePDFInfo = async ({
  userId,
  file,
}: {
  userId: string;
  file: File;
}) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const generatedTitle = await generateQuizTitle(file.name);

  console.log({ generatedTitle });

  const { data: fileSaveRes, error: fileSaveErr } = await supabase.storage
    .from("pdf_chat")
    .upload(
      `${userId}/${file.name
        .replace(".pdf", "")
        .replaceAll(" ", "-")}-${shortUid.rnd()}.pdf`,
      file
    );

  console.log({ fileSaveRes, fileSaveErr });

  const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileSaveRes?.fullPath}`;

  console.log({ fileUrl });

  const createdPdfChatRes = await axios.post("/api/pdf-chat/create-pdf-chat", {
    userId,
    fileUrl,
    title: generatedTitle,
    fileName: file.name,
  });

  // const { data, error } = await supabase
  //   .from("pdf_chat")
  //   .insert({
  //     title: generatedTitle,
  //     summary: "",
  //     user_id: userId,
  //     file_name: file.name,
  //     file_url: fileUrl,
  //   })
  //   .select("id")
  //   .single();

  // if (error) {
  //   console.error(error);
  //   throw new Error(error.message);
  // }

  // if (!data) {
  //   throw new Error("Could not save the data");
  // }

  // console.log({ data });

  return createdPdfChatRes.data;
};

export const getPDFData = async ({ pdfId }: { pdfId: string }) => {
  const { error, data } = await supabase
    .from("pdf_chat")
    .select(
      `
      *,
      pdf_chat_messages (
      *
      )
      `
    )
    .eq("id", pdfId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const getAllPDFInfo = async ({
  userId,
}: {
  userId: string | null | undefined;
}) => {
  const { data, error } = await supabase
    .from("pdf_chat")
    .select("id,title,created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const updatePDFChatSummary = async ({
  pdfChatId,
  summary,
}: {
  pdfChatId: string;
  summary: string;
}) => {
  console.log({ pdfChatId, summary });

  const { error, data } = await supabase
    .from("pdf_chat")
    .update({
      summary,
    })
    .eq("id", pdfChatId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  // console.log({ data });

  return data;
};

export const updateWorksheet = async ({
  worksheetId,
  worksheets,
}: {
  worksheetId: string;
  worksheets: string;
}) => {
  console.log({ worksheetId, worksheets });

  const { error, data } = await supabase
    .from("worksheets")
    .update({
      worksheets,
    })
    .eq("id", worksheetId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};
export const updateLessonPlan = async ({
  lessonPlanId,
  lessonPlan,
}: {
  lessonPlanId: string;
  lessonPlan: string;
}) => {
  console.log({ lessonPlanId, lessonPlan });

  const { error, data } = await supabase
    .from("lesson_plan")
    .update({
      plan: lessonPlan,
    })
    .eq("id", lessonPlanId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};

export const savePdfChatMessage = async ({
  pdfChatId,
  message,
}: {
  pdfChatId: string | null;
  message: { role: string; content: string; metadata?: Record<string, any> };
  // attachments: Attachment[] = [];
}) => {
  console.log({ pdfChatId, message });

  if (!pdfChatId) return message;

  const { error } = await supabase.from("pdf_chat_messages").insert({
    pdf_chat_id: pdfChatId,
    role: message.role,
    content: message.content,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  await queryClient.invalidateQueries({ queryKey: ["pdfData", pdfChatId] });

  return message;
};

export const createNCERTChat = async ({
  userId,
  pdfUrl,
}: {
  userId: string;
  pdfUrl: string;
}) => {
  console.log({ userId, pdfUrl });

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // const { error: chatError, data: chat } = await supabase
  //   .from("pdf_chat")
  //   .select(`id`)
  //   .eq("file_url", pdfUrl);
  // // .single();

  // if (chatError) {
  //   console.error(chatError);
  //   throw new Error(chatError.message);
  // }

  // console.log({ chat });
  // if (chat && chat.length > 0) return chat[0];

  const fileName = pdfUrl.replace(
    "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/",
    ""
  );

  const generatedTitle = await generateQuizTitle(fileName);

  console.log({ generatedTitle });

  const createdPdfChatRes = await axios.post("/api/pdf-chat/create-pdf-chat", {
    userId,
    // fileUrl:
    //   "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/299d3d87-8bb7-4527-b9af-137cb14c6914/A_Brief_Introduction_To_AI-bY6MEr7kOD.pdf",
    fileUrl:
      "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Contemporary%20India/Climate.pdf",
    title: generatedTitle,
    fileName,
  });

  // const { data, error } = await supabase
  //   .from("pdf_chat")
  //   .insert({
  //     title: generatedTitle,
  //     summary: "",
  //     user_id: userId,
  //     file_name: "",
  //     file_url: pdfUrl,
  //   })
  //   .select("id")
  //   .single();

  // if (error) {
  //   console.error(error);
  //   throw new Error(error.message);
  // }

  // if (!data) {
  //   throw new Error("Could not save the data");
  // }

  // console.log({ data });

  return createdPdfChatRes.data;
};

export const getUsageTokens = async ({ userId }: { userId: string }) => {
  console.log({ userId });

  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();
  const { data: tokenUsage, error } = await supabase
    .from("token_usage")
    .select("total_tokens")
    .eq("user_id", userId)
    .eq("month", CURRENT_MONTH)
    .eq("year", CURRENT_YEAR);

  const totalTokens = (tokenUsage ?? []).reduce(
    (acc, token) => acc + token.total_tokens,
    0
  );

  console.log({ tokenUsage, totalTokens });

  return { totalTokens };
};

export const insertUsageTokens = async ({
  userId,
  userEmail,
  promptTokens,
  completionTokens,
  totalTokens,
  llm,
  model,
  type,
}: {
  userId: string;
  userEmail: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  llm: string;
  model: string;
  type: string;
}) => {
  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();
  const { data, error: error } = await supabase
    .from("token_usage")
    .insert({
      type,
      user_id: userId,
      // user_email: inputData.userEmail,
      email: userEmail,
      month: CURRENT_MONTH,
      year: CURRENT_YEAR,
      input_token: promptTokens,
      output_token: completionTokens,
      total_tokens: totalTokens,
      llm,
      model,
    })
    .select("total_tokens");

  console.log({ data, error });
};
export const createNote = async ({
  title,
  note,
  pdfChatId,
}: {
  title: string;
  note: string;
  pdfChatId: string;
}) => {
  const { data, error: error } = await supabase
    .from("pdf_chat_notes")
    .insert({
      title,
      note,
      pdf_chat_id: pdfChatId,
    })
    .select("id")
    .single();

  console.log({ data, error });

  if (!data || error) {
    throw new Error(error.message ?? "Something went wrong!");
  }

  return data;
};

export const getPDFChatNotes = async ({ pdfChatId }: { pdfChatId: string }) => {
  console.log({ pdfChatId });

  const { data: notes, error } = await supabase
    .from("pdf_chat_notes")
    .select("id,title,note")
    .eq("pdf_chat_id", pdfChatId);

  if (!notes || error) {
    throw new Error(error.message ?? "Something went wrong!");
  }

  return notes;
};

export const deletePDFChatNote = async ({ noteId }: { noteId: string }) => {
  const { data, error } = await supabase
    .from("pdf_chat_notes")
    .delete()
    .eq("id", noteId)
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export const deleteLessonPlan = async ({
  lessonPlanId,
}: {
  lessonPlanId: string;
}) => {
  const { data, error } = await supabase
    .from("lesson_plan")
    .delete()
    .eq("id", lessonPlanId)
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const renameLessonPlanTitle = async ({
  lessonPlanId,
  title,
}: {
  lessonPlanId: string;
  title: string;
}) => {
  console.log({ lessonPlanId, title });

  const { error, data } = await supabase
    .from("lesson_plan")
    .update({
      title: title,
    })
    .eq("id", lessonPlanId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};
export const deleteWorksheet = async ({
  worksheetId,
}: {
  worksheetId: string;
}) => {
  const { data, error } = await supabase
    .from("worksheets")
    .delete()
    .eq("id", worksheetId)
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const renameWorksheetTitle = async ({
  worksheetId,
  title,
}: {
  worksheetId: string;
  title: string;
}) => {
  console.log({ worksheetId, title });

  const { error, data } = await supabase
    .from("worksheets")
    .update({
      title: title,
    })
    .eq("id", worksheetId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};
export const deleteQFDQuiz = async ({ quizId }: { quizId: string }) => {
  const { data, error } = await supabase
    .from("qfd_quiz")
    .delete()
    .eq("id", quizId)
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const renameQFDQuizTitle = async ({
  quizId,
  title,
}: {
  quizId: string;
  title: string;
}) => {
  console.log({ quizId, title });

  const { error, data } = await supabase
    .from("qfd_quiz")
    .update({
      title: title,
    })
    .eq("id", quizId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};
export const deletePDFChat = async ({ id }: { id: string }) => {
  const { data, error } = await supabase
    .from("pdf_chat")
    .delete()
    .eq("id", id)
    .select("id,file_url")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  console.log({ data });

  const storagePath = data.file_url.split("public/pdf_chat/")[1];
  const isNCERT = data.file_url.split("/").includes("NCERT");

  console.log({ storagePath, isNCERT });

  if (!isNCERT) {
    const { data: storageData, error: storageError } = await supabase.storage
      .from("pdf_chat")
      .remove([storagePath]);

    console.log({ storageData, storageError });
  }

  return data;
};

export const renamePDFChatTitle = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  console.log({ id, title });

  const { error, data } = await supabase
    .from("pdf_chat")
    .update({
      title: title,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log({ data });

  return data;
};
