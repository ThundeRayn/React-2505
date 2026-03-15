import type { ReactNode, CSSProperties } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

export default function IconButton({ icon, label, onClick, style }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 24px',
        borderRadius: 20,
        border: 'none',
        background: 'rgba(255,255,255,0.09)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: 'var(--text-secondary)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
        ...style,
      }}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}
