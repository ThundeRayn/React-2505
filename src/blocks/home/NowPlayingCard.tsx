import { Music } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function NowPlayingCard() {
  return (
    <GlassCard padding={20} gap={10} style={{ flex: 1, height: '100%', minWidth: 0, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 0.5, color: 'rgba(255,255,255,0.67)' }}>Now Playing</span>
        <Music size={18} color="var(--accent-purple)" />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Coming soon</span>
      </div>
    </GlassCard>
  );
}
