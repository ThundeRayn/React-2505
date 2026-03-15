import { Heart } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import StatusPicker from '../../components/StatusPicker';
import { useCatStatus } from '../../hooks/useCatStatus';
import { useAuth } from '../../hooks/useAuth';
import type { CatMood } from '../../types/cat';

const MOOD_OPTIONS: { value: CatMood; label: string; emoji: string }[] = [
  { value: 'happy', label: 'Happy', emoji: '😸' },
  { value: 'sad', label: 'Sad', emoji: '😿' },
  { value: 'sleepy', label: 'Sleepy', emoji: '😴' },
  { value: 'hungry', label: 'Hungry', emoji: '🍽️' },
  { value: 'playful', label: 'Playful', emoji: '😺' },
  { value: 'angry', label: 'Angry', emoji: '😾' },
];

export default function CatStatusCard() {
  const { cats, updateMood, loading } = useCatStatus();
  const { user } = useAuth();

  return (
    <GlassCard padding={20} gap={12} style={{ flex: 1, height: '100%', minWidth: 0, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 0.5, color: 'rgba(255,255,255,0.67)' }}>Cat Status</span>
        <Heart size={18} color="var(--accent-pink)" />
      </div>
      {loading ? (
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Loading...</span>
      ) : (
        <div style={{ display: 'flex', gap: 12, flex: 1, width: '100%' }}>
          {cats.map(cat => {
            const moodEmoji = MOOD_OPTIONS.find(o => o.value === cat.mood)?.emoji || '😸';
            return (
              <div key={cat.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                {cat.image_url ? (
                  <img src={cat.image_url} alt={cat.name} style={{ width: 44, height: 44, borderRadius: 22, objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: 36 }}>{moodEmoji}</span>
                )}
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{cat.name}</span>
                <StatusPicker
                  value={cat.mood}
                  onChange={(val) => user && updateMood(cat.id, val as CatMood, user.id)}
                  options={MOOD_OPTIONS}
                />
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
