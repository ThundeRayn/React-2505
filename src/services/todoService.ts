import { supabase } from '../lib/supabase';
import type { Todo } from '../types/todo';

export async function getTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('*, profiles!todos_assignee_id_fkey(name)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((t: any) => ({
    ...t,
    assignee_name: t.profiles?.name || 'Unknown',
    profiles: undefined,
  }));
}

export async function createTodo(text: string, assigneeId: string, createdBy: string) {
  const { error } = await supabase
    .from('todos')
    .insert({ text, assignee_id: assigneeId, created_by: createdBy, completed: false });
  if (error) throw error;
}

export async function toggleTodo(id: string, completed: boolean) {
  const { error } = await supabase
    .from('todos')
    .update({ completed })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteTodo(id: string) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
