import type { ReactNode, CSSProperties } from 'react';

interface BadgeProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function Badge({ children, style }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px 10px',
      borderRadius: 12,
      background: 'rgba(255,255,255,0.19)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--text-primary)',
      ...style,
    }}>
      {children}
    </span>
  );
}
