import { Footprints } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function StepsCard() {
  return (
    <GlassCard padding={16} gap={8} style={{ flex: 1, height: '100%', minWidth: 0, minHeight: 0, overflow: 'hidden' }}>
      <Footprints size={22} color="var(--accent-green)" />
      <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, color: 'rgba(255,255,255,0.3)' }}>—</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>Steps</span>
    </GlassCard>
  );
}
