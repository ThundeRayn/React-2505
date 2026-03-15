import { Home, CheckSquare, Image, User } from 'lucide-react';

export type TabName = 'home' | 'todo' | 'gallery' | 'profile';

interface BottomNavProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

const TABS: { key: TabName; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'todo', label: 'Todo', icon: CheckSquare },
  { key: 'gallery', label: 'Gallery', icon: Image },
  { key: 'profile', label: 'Profile', icon: User },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '12px 24px 24px 24px',
      width: '100%',
      flexShrink: 0,
    }}>
      <div
        className="glass-card"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 62,
          width: '100%',
          padding: 4,
          borderRadius: 'var(--pill-radius)',
          borderColor: 'var(--glass-border-strong)',
        }}
      >
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                flex: 1,
                height: '100%',
                borderRadius: 26,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
                boxShadow: isActive
                  ? '0 1px 2px rgba(255,255,255,0.38), inset 0 0 0 0.5px rgba(255,255,255,0.1)'
                  : 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
            >
              <Icon
                size={20}
                color={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)'}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
