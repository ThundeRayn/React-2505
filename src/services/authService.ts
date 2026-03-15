import { supabase } from '../lib/supabase';
import type { User } from '../types/auth';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

export async function getProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

export async function getProfiles(): Promise<User[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, city, lat, lon, use_location, created_at');
  if (error || !data) return [];
  return data as User[];
}

export async function updateProfile(
  userId: string,
  updates: Partial<Pick<User, 'name' | 'avatar_url' | 'city' | 'lat' | 'lon' | 'use_location'>>
) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  if (error) throw error;
}

export function onAuthStateChange(callback: (session: import('@supabase/supabase-js').Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}
