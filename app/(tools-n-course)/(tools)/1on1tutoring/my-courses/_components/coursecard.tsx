'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  id: string;
  subject: string;
  proficiency: string;
  email: string;
  userId: string;
}

export default function CourseCard({ id, subject, proficiency, email, userId }: CourseCardProps) {
  const router = useRouter();

  const handleClick = () => {
    const url = `/1on1tutoring/course?subject=${encodeURIComponent(subject)}&proficiency=${encodeURIComponent(proficiency)}&chatId=${encodeURIComponent(id)}&userEmail=${encodeURIComponent(email)}&userId=${encodeURIComponent(userId)}`;
    router.push(url);
  };

  return (
    <Card
      className="cursor-pointer hover:border-blue-500 transition-colors w-full text-center item-center min-w-[80%]"
      onClick={handleClick}
    >
      <CardContent className="pt-6">
        <p className="text-lg font-medium capitalize ">
          {subject} - {proficiency}
        </p>
      </CardContent>
    </Card>
  );
}