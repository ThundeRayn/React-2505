import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 22,
        height: 22,
        minWidth: 22,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: checked ? 'none' : '1.5px solid rgba(255,255,255,0.38)',
        background: checked ? 'rgba(255,255,255,0.13)' : 'transparent',
        cursor: 'pointer',
        padding: 0,
        boxShadow: checked ? '0 1px 2px rgba(255,255,255,0.25)' : 'none',
      }}
    >
      {checked && <Check size={14} color="#FFFFFF" strokeWidth={2.5} />}
    </button>
  );
}
