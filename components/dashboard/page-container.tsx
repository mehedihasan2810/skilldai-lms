import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = false
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-65px)] flex-1">
          <div className="h-full  p-4 md:px-8 bg-secondary/5">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full  p-4 md:px-8 flex-1">{children}</div>
      )}
    </>
  );
}