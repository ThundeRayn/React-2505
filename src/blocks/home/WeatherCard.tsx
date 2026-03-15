import { useEffect, useRef, useState } from 'react';
import GlassCard from '../../components/GlassCard';
import { getWeather } from '../../services/weatherService';
import * as authService from '../../services/authService';

export default function WeatherCard() {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState<{ label: string; temp: string; condition: string }[]>(
    Array.from({ length: 4 }, () => ({ label: '—', temp: '—', condition: '—' }))
  );
  const lastFetch = useRef(0);

  useEffect(() => {
    let cancelled = false;
    if (Date.now() - lastFetch.current < 30 * 60 * 1000) return;

    (async () => {
      setLoading(true);
      const profiles = await authService.getProfiles();
      const ordered = [...profiles].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 4);
      const results = await Promise.all(
        ordered.map(async (u) => {
          if (!u.use_location || u.lat == null || u.lon == null) {
            return { label: u.name, temp: '—', condition: '—' };
          }
          try {
            const data = await getWeather(u.lat, u.lon);
            return { label: u.name, temp: `${data.temp}°`, condition: data.condition };
          } catch {
            return { label: u.name, temp: '—', condition: '—' };
          }
        })
      );

      if (cancelled) return;
      const filled = results.length < 4
        ? [...results, ...Array.from({ length: 4 - results.length }, () => ({ label: '—', temp: '—', condition: '—' }))]
        : results;
      setSlots(filled);
      lastFetch.current = Date.now();
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <GlassCard
      padding={16}
      gap={8}
      style={{
        flex: 1,
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 12,
          width: 'min(100%, 360px)',
          margin: '0 auto',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        {slots.map((slot, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: 0,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{slot.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>
              {loading ? '—' : slot.temp}
            </span>
            <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
              {loading ? '—' : slot.condition}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
