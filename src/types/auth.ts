export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  city?: string | null;
  lat?: number | null;
  lon?: number | null;
  use_location?: boolean | null;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  session: import('@supabase/supabase-js').Session | null;
  loading: boolean;
}
