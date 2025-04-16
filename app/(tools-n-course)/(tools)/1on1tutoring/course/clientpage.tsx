'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Sidebar from './_components/sidebar';
import MainContent from './_components/maincontent';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Toaster } from 'sonner';

interface Module {
  id: number;
  title: string;
  progress: number;
  weak: boolean;
  contents: string;
  practice: string[];
  quiz: { question: string; options: string[]; correct: number }[];
  answers?: (number | null)[];
  isCompleted?: boolean;
}

interface ClientPageProps {
  subject: string;
  proficiency: string;
  userEmail: string;
  userId: string;
  chatId?: string;
}

const defaultModule: Module = {
  id: 1,
  title: 'Default Module',
  progress: 0,
  weak: false,
  contents: 'No content available.',
  practice: ['No practice questions available.'],
  quiz: [{ question: 'No quiz available.', options: ['N/A'], correct: 0 }],
};

async function fetchModules({
  subject,
  proficiency,
  userEmail,
  userId,
  chatId,
}: ClientPageProps): Promise<Module[]> {
  const response = await fetch('/api/1on1tutoring/generate-modules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, proficiency, userEmail, userId, chatId }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch modules.');
  }

  const data = await response.json();
  return data.modules || [];
}

async function fetchProgress({ chatId, userId }: { chatId: string; userId: string }) {
  const response = await fetch(`/api/1on1tutoring/module-progress?chatId=${chatId}&userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch progress.');
  }
  const data = await response.json();
  return data.modules || [];
}

export default function ClientPage({
  subject,
  proficiency,
  userEmail,
  userId,
  chatId = crypto.randomUUID(),
}: ClientPageProps) {
  const queryClient = useQueryClient();
  const { data: modulesData = [], isLoading: modulesLoading, error: modulesError, refetch } = useQuery({
    queryKey: ['modules', subject, proficiency, userEmail, userId, chatId],
    queryFn: () => fetchModules({ subject, proficiency, userEmail, userId, chatId }),
    enabled: !!subject && !!proficiency && !!userEmail && !!userId,
  });

  const { data: progressData = [], isLoading: progressLoading } = useQuery({
    queryKey: ['progress', chatId, userId],
    queryFn: () => fetchProgress({ chatId, userId }),
    enabled: !!chatId && !!userId,
  });

  // Merge modules with progress
  const modules = modulesData.map((module) => {
    const progress = progressData.find((p: any) => p.module_id === module.id);
    return {
      ...module,
      progress: progress?.progress ?? module.progress ?? 0,
      answers: progress?.answers ?? new Array(module.quiz.length).fill(null),
      isCompleted: progress?.is_completed ?? false,
    };
  });

  const [activeModuleId, setActiveModuleId] = useState(
    modules.length > 0 ? modules[0].id : defaultModule.id
  );

  const activeModule =
    modules.find((m) => m.id === activeModuleId) || defaultModule;

  const handleSelectModule = (id: number) => {
    setActiveModuleId(id);
  };

// ClientPage.tsx
const handleProgressUpdate = async (moduleId: number, newProgress: number, isCompleted: boolean) => {
  // Update progress cache for specific module
  queryClient.setQueryData(['progress', chatId, userId], (old: any[] | undefined) => {
    if (!old) {
      return [{
        module_id: moduleId,
        progress: newProgress,
        answers: modules.find((m) => m.id === moduleId)?.answers || new Array(modules.find((m) => m.id === moduleId)?.quiz.length).fill(null),
        is_completed: isCompleted,
      }];
    }
    const existingIndex = old.findIndex((p) => p.module_id === moduleId);
    if (existingIndex >= 0) {
      return old.map((p) =>
        p.module_id === moduleId
          ? { ...p, progress: newProgress, answers: p.answers, is_completed: isCompleted }
          : p
      );
    }
    return [
      ...old,
      {
        module_id: moduleId,
        progress: newProgress,
        answers: modules.find((m) => m.id === moduleId)?.answers || new Array(modules.find((m) => m.id === moduleId)?.quiz.length).fill(null),
        is_completed: isCompleted,
      },
    ];
  });

  // Update modules cache for specific module
  queryClient.setQueryData(
    ['modules', subject, proficiency, userEmail, userId, chatId],
    (old: Module[] | undefined) =>
      old?.map((m) =>
        m.id === moduleId
          ? { ...m, progress: newProgress, isCompleted }
          : m
      ) || []
  );

  // Invalidate progress query to sync with server
  await queryClient.invalidateQueries({ queryKey: ['progress', chatId, userId] });
};

  if (modulesLoading || progressLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        <span className="ml-2 text-lg items-center">Loading modules...</span>
      </div>
    );
  }

  if (modulesError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 text-center">
        <p className="text-red-500">Error loading modules: {(modulesError as Error).message}</p>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full min-w-[80%]">
      <Sidebar
        modules={modules}
        activeModuleId={activeModuleId}
        onSelectModule={handleSelectModule}
      />
      <div className="flex-1 p-6 md:p-8 w-full min-w-[80%]">
        <h1 className="text-2xl font-bold mb-6">
          {subject.charAt(0).toUpperCase() + subject.slice(1)} Mastery
        </h1>
        <MainContent
          module={activeModule}
          chatId={chatId}
          userId={userId}
          onProgressUpdate={handleProgressUpdate}
        />
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}