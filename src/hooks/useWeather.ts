import { useState, useEffect, useRef } from 'react';
import { getWeather, type WeatherData } from '../services/weatherService';
import { useAuth } from './useAuth';

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export function useWeather() {
  const { user } = useAuth();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastFetch = useRef(0);
  const lastLocationKey = useRef<string>('');

  useEffect(() => {
    const lat = user?.use_location ? user?.lat ?? undefined : undefined;
    const lon = user?.use_location ? user?.lon ?? undefined : undefined;
    const locationKey = `${lat ?? 'default'},${lon ?? 'default'}`;

    const now = Date.now();
    if (data && now - lastFetch.current < CACHE_DURATION && lastLocationKey.current === locationKey) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    getWeather(lat, lon)
      .then(result => {
        if (!cancelled) {
          setData(result);
          lastFetch.current = Date.now();
          lastLocationKey.current = locationKey;
          setError(null);
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [user?.use_location, user?.lat, user?.lon]);

  return { data, loading, error };
}
