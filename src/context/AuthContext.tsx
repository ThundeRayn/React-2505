import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { User } from '../types/auth';
import * as authService from '../services/authService';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the app-specific profile row tied to the Supabase auth user id.
  const loadProfile = async (userId: string) => {
    const profile = await authService.getProfile(userId);
    setUser(profile);
  };

  useEffect(() => {
    // Subscribe to Supabase auth changes.
    // This fires immediately with the current session (if one exists) and on every sign-in/out.
    const { data: { subscription } } = authService.onAuthStateChange(async (newSession) => {
      setSession(newSession);
      if (newSession?.user?.id) {
        await loadProfile(newSession.user.id);
      } else {
        setUser(null);
      }
      // We have resolved the initial auth state, so the UI can render.
      setLoading(false);
    });

    // Clean up the auth subscription on unmount.
    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    const { session: newSession } = await authService.signIn(email, password);
    setSession(newSession);
    if (newSession?.user?.id) {
      await loadProfile(newSession.user.id);
    }
  };

  const handleSignOut = async () => {
    // Clear both the Supabase session and the in-memory user state.
    await authService.signOut();
    setSession(null);
    setUser(null);
  };

  const handleUpdatePassword = async (newPassword: string) => {
    await authService.updatePassword(newPassword);
  };

  const refreshProfile = async () => {
    // Manual refresh, useful after profile edits.
    if (session?.user?.id) {
      await loadProfile(session.user.id);
    }
  };

  return (
    <AuthContext.Provider value={{
      user, session, loading,
      signIn: handleSignIn,
      signOut: handleSignOut,
      updatePassword: handleUpdatePassword,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
