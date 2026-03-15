import { Bell, Palette, Shield, Users, LifeBuoy, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Badge from '../../components/Badge';

interface SettingsItem {
  icon: LucideIcon;
  label: string;
  badge?: string;
}

const SETTINGS: SettingsItem[] = [
  { icon: Bell, label: 'Notifications' },
  { icon: Palette, label: 'Appearance' },
  { icon: Shield, label: 'Privacy & Security' },
  { icon: Users, label: 'Members', badge: '4' },
  { icon: LifeBuoy, label: 'Help & Support' },
];

export default function SettingsList() {
  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      {SETTINGS.map((item, i) => (
        <div key={item.label}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 20px',
              width: '100%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <item.icon size={20} color="rgba(255,255,255,0.67)" />
            <span style={{ flex: 1, textAlign: 'left', fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
              {item.label}
            </span>
            {item.badge && <Badge>{item.badge}</Badge>}
            <ChevronRight size={18} color="rgba(255,255,255,0.27)" />
          </button>
          {i < SETTINGS.length - 1 && (
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', width: '100%' }} />
          )}
        </div>
      ))}
    </div>
  );
}
