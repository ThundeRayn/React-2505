import { Signal, Wifi, BatteryFull } from 'lucide-react';

export default function StatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 62,
      padding: '0 24px',
      width: '100%',
      flexShrink: 0,
    }}>
      <span style={{
        fontSize: 16,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.9)',
      }}>
        {time}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Signal size={16} color="rgba(255,255,255,0.9)" />
        <Wifi size={16} color="rgba(255,255,255,0.9)" />
        <BatteryFull size={20} color="rgba(255,255,255,0.9)" />
      </div>
    </div>
  );
}
