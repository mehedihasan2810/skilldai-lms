"use client";

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Markdown from "@/components/markdown/markdown";

interface FetchContentProps {
  topic: string | null;
  subtopic: string | null;
  subdivision: string | null;
  domain: string | null;
  userEmail: string | null;
  userId: string | null;
  chatId: string | null;
}

async function fetchContent({
  topic,
  subtopic,
  subdivision,
  domain,
  userEmail,
  userId,
  chatId,
}: FetchContentProps) {
  if (!userId || !userEmail || !topic || !subtopic) {
    throw new Error('Missing required parameters or user not authenticated');
  }

  const response = await fetch(`/api/sat/generte-content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      subtopic,
      subdivision,
      domain,
      userEmail,
      userId,
      chatId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate content');
  }

  const data = await response.json();
  return data.content || '';
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('section');
  const subtopic = searchParams.get('subtopic');
  const subdivision = searchParams.get('subsections');
  const domain = searchParams.get('domain');
  const chatId = searchParams.get('chatId');
  const userId = searchParams.get('userId');
  const userEmail = searchParams.get('userEmail');

  const queryClient = useQueryClient();
  const { data: content = '', isLoading, error } = useQuery({
    queryKey: ['satContent', topic, subtopic, subdivision, domain, userEmail, userId, chatId],
    queryFn: () => fetchContent({ topic, subtopic, subdivision, domain, userEmail, userId, chatId }),
    enabled: !!userId && !!userEmail && !!topic && !!subtopic,
  });

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error instanceof Error ? error.message : 'An error occurred'}</p>
            <Button
              onClick={() => router.push('/sat')}
              className="mt-4"
              variant="outline"
            >
              Back to Selection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 w-full">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>
            SAT Content: {topic} - {domain} - {subtopic} - {subdivision || 'N/A'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500">Loading content...</p>
          ) : content ? (
            <div className="prose prose-sm max-w-none w-full">
              <Markdown text={content} className="max-w-2xl break-all" />
            </div>
          ) : (
            <p className="text-gray-500">No content generated</p>
          )}
          <Button
            onClick={() => router.push('/sat')}
            className="mt-4"
            variant="outline"
          >
            Back to Selection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}