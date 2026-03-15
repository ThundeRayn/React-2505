import type { CSSProperties } from 'react';

interface InputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  style?: CSSProperties;
}

export default function Input({ value, onChange, placeholder, type = 'text', style }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '14px 16px',
        borderRadius: 'var(--card-radius)',
        border: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        color: 'var(--text-primary)',
        fontSize: 15,
        fontFamily: 'inherit',
        outline: 'none',
        ...style,
      }}
    />
  );
}
