// app/1on1tutoring/course/page.tsx
import { redirect } from 'next/navigation';
import ClientPage from './clientpage';

// Define props for searchParams
interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  // Extract params from searchParams
  const subject = searchParams.subject;
  const proficiency = searchParams.proficiency;
  const chatId = searchParams.chatId;
  const userEmail = searchParams.userEmail;
  const userId = searchParams.userId;

  // Validate params
  if (!subject || !proficiency || !chatId || !userEmail || !userId) {
    return redirect('/'); // Redirect if any required param is missing
  }

  return (
    <ClientPage
      subject={subject}
      proficiency={proficiency}
      userEmail={userEmail}
      userId={userId}
      chatId={chatId}
    />
  );
}