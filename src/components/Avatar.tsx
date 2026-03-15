import type { CSSProperties } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string | null;
  size?: number;
  style?: CSSProperties;
}

export default function Avatar({ src, size = 80, style }: AvatarProps) {
  return (
    <div style={{
      width: size,
      height: size,
      minWidth: size,
      borderRadius: size,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,255,255,0.08)',
      border: '2px solid rgba(255,255,255,0.19)',
      ...style,
    }}>
      {src ? (
        <img src={src} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <User size={size * 0.45} color="rgba(255,255,255,0.5)" />
      )}
    </div>
  );
}
