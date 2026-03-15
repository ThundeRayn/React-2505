import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Cat, CatMood } from '../types/cat';
import * as catService from '../services/catService';

export function useCatStatus() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    catService.getCats()
      .then(setCats)
      .catch(console.error)
      .finally(() => setLoading(false));

    const channel = supabase
      .channel('cats-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cats' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setCats(prev => prev.map(c => c.id === (payload.new as Cat).id ? payload.new as Cat : c));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateMood = async (catId: string, mood: CatMood, userId: string) => {
    setCats(prev => prev.map(c => c.id === catId ? { ...c, mood, updated_by: userId, updated_at: new Date().toISOString() } : c));
    await catService.updateCatMood(catId, mood, userId);
  };

  return { cats, updateMood, loading };
}
