import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../hooks/useAuth';
import * as authService from '../../services/authService';

export default function LocationSettings() {
  const { user, refreshProfile } = useAuth();
  const [useLocation, setUseLocation] = useState<boolean>(!!user?.use_location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUseLocation(!!user?.use_location);
  }, [user?.use_location]);

  const updateProfileLocation = async (nextUseLocation: boolean) => {
    if (!user) return;
    setLoading(true);
    setError(null);

    if (!nextUseLocation) {
      await authService.updateProfile(user.id, {
        use_location: false,
      });
      await refreshProfile();
      setUseLocation(false);
      setLoading(false);
      return;
    }

    if (!navigator.geolocation) {
      setError('Geolocation not supported in this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await authService.updateProfile(user.id, {
            use_location: true,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          await refreshProfile();
          setUseLocation(true);
        } catch {
          setError('Failed to save location.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location permission denied.');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60 * 60 * 1000 }
    );
  };

  return (
    <GlassCard padding={16} gap={12}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <MapPin size={18} color="rgba(255,255,255,0.8)" />
        <span style={{ fontSize: 15, fontWeight: 600 }}>Use my location</span>
        <button
          onClick={() => updateProfileLocation(!useLocation)}
          disabled={loading}
          style={{
            marginLeft: 'auto',
            padding: '6px 12px',
            borderRadius: 999,
            border: '1px solid var(--glass-border-strong)',
            background: useLocation ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
            color: 'var(--text-primary)',
            fontSize: 12,
            fontWeight: 600,
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Updating...' : useLocation ? 'On' : 'Off'}
        </button>
      </div>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
        We update weather using your current location when enabled.
      </span>
      {error && <span style={{ fontSize: 12, color: 'var(--accent-red)' }}>{error}</span>}
    </GlassCard>
  );
}
