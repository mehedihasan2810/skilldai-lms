import { Button } from '@/components/ui/button';
import ContentTabs from './contenttabs';

interface Module {
  id: number;
  title: string;
  progress: number;
  weak: boolean;
  contents: string;
  practice: string[];
  quiz: { question: string; options: string[]; correct: number }[];
}

interface MainContentProps {
  module: Module | null;
  chatId: string;
  userId: string;
  onProgressUpdate?: (moduleId: number, newProgress: number, isCompleted: boolean) => void;
}

export default function MainContent({ module, chatId, userId, onProgressUpdate }: MainContentProps) {
  if (!module) {
    return (
      <div className="p-4 w-full min-w-[80%]">
        <p className="text-gray-500">Select a module to start learning</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full min-w-[80%]">
      <ContentTabs
        module={module}
        chatId={chatId}
        userId={userId}
        onProgressUpdate={onProgressUpdate}
      />
    </div>
  );
}