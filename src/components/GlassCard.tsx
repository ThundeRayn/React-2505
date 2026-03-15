import type { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  padding?: number | string;
  gap?: number;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, padding = 20, gap, style, className = '', onClick }: GlassCardProps) {
  return (
    <div
      className={`glass-card ${className}`}
      onClick={onClick}
      style={{
        padding,
        display: 'flex',
        flexDirection: 'column',
        ...(gap !== undefined && { gap }),
        ...(onClick && { cursor: 'pointer' }),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
