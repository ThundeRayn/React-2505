import { supabase } from '../lib/supabase';
import type { Cat, CatMood } from '../types/cat';

export async function getCats(): Promise<Cat[]> {
  const { data, error } = await supabase
    .from('cats')
    .select('*')
    .order('id');
  if (error) throw error;
  return data || [];
}

export async function updateCatMood(catId: string, mood: CatMood, userId: string) {
  const { error } = await supabase
    .from('cats')
    .update({ mood, updated_by: userId, updated_at: new Date().toISOString() })
    .eq('id', catId);
  if (error) throw error;
}
