import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const ProgressSchema = z.object({
  chatId: z.string().min(1),
  userId: z.string().min(1),
  moduleId: z.number().min(1),
  progress: z.number().min(0).max(100),
  answers: z.array(z.number().nullable()),
  isCompleted: z.boolean(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get('chatId');
    const userId = searchParams.get('userId');

    if (!chatId || !userId) {
      return NextResponse.json({ error: 'Missing chatId or userId' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('module_progress')
      .select('modules')
      .eq('chat_id', chatId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching progress:', error);
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }

    return NextResponse.json({ modules: data?.modules || [] });
  } catch (error) {
    console.error('Error in GET /module-progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// api/1on1tutoring/module-progress/route.tsx
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatId, userId, moduleId, progress, answers, isCompleted } = ProgressSchema.parse(body);

    const supabase = await createClient();

    // Verify module exists
    const { data: tutorModules, error: tutorError } = await supabase
      .from('modules_1on1tutor')
      .select('modules, subject, proficiency')
      .eq('id', chatId)
      .eq('user_id', userId)
      .single();

    if (tutorError || !tutorModules) {
      console.error('Error fetching tutor modules:', tutorError);
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const moduleExists = tutorModules.modules.some((m: any) => m.id === moduleId);
    if (!moduleExists) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    // Validate answers length against module's quiz
    const targetModule = tutorModules.modules.find((m: any) => m.id === moduleId);
    if (answers.length !== targetModule.quiz.length) {
      return NextResponse.json({ error: 'Invalid answers length' }, { status: 400 });
    }

    // Fetch existing progress
    const { data: existingProgress, error: fetchError } = await supabase
      .from('module_progress')
      .select('modules')
      .eq('chat_id', chatId)
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching progress:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }

    // Initialize or update modules array
    let updatedModules = existingProgress?.modules ? [...existingProgress.modules] : [];

    // Update or add the target module
    const updatedModule = {
      module_id: moduleId,
      progress,
      answers,
      is_completed: isCompleted,
    };

    const moduleIndex = updatedModules.findIndex((m: any) => m.module_id === moduleId);
    if (moduleIndex >= 0) {
      updatedModules[moduleIndex] = updatedModule;
    } else {
      updatedModules.push(updatedModule);
    }

    // Ensure other modules are not affected
    updatedModules = updatedModules.map((m: any) => ({
      ...m,
      module_id: m.module_id,
      progress: m.module_id === moduleId ? progress : m.progress,
      answers: m.module_id === moduleId ? answers : m.answers,
      is_completed: m.module_id === moduleId ? isCompleted : m.is_completed,
    }));

    console.log('Updating module progress:', { moduleId, progress, isCompleted });

    // Upsert progress
    if (!existingProgress) {
      const { error: insertError } = await supabase
        .from('module_progress')
        .insert({
          chat_id: chatId,
          user_id: userId,
          subject: tutorModules.subject,
          proficiency: tutorModules.proficiency,
          modules: updatedModules,
        });

      if (insertError) {
        console.error('Error inserting progress:', insertError);
        return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
      }
    } else {
      const { error: updateError } = await supabase
        .from('module_progress')
        .update({ modules: updatedModules })
        .eq('chat_id', chatId)
        .eq('user_id', userId);

      if (updateError) {
        console.error('Error updating progress:', updateError);
        return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /module-progress:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export const runtime = 'edge';