import { Calendar } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function CalendarCard() {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleDateString('en-US', { month: 'long' });
  const statusSlots = [
    { label: 'User 1', value: null },
    { label: 'User 2', value: null },
    { label: 'User 3', value: null },
    { label: 'User 4', value: null },
  ];

  return (
    <GlassCard padding={20} gap={12} style={{ flex: 1, height: '100%', minWidth: 0, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.3, color: 'rgba(255,255,255,0.67)' }}>Calendar</span>
        <Calendar size={16} color="rgba(255,255,255,0.73)" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1, color: '#FFFFFF', lineHeight: 1 }}>{day}</span>
        <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{month}</span>
      </div>
      {/* Status grid (4 slots) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, width: '100%' }}>
        {statusSlots.map((slot, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 8, borderRadius: 10, background: 'rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>{slot.label}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{slot.value ?? '—'}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
