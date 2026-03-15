import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function LogoutButton() {
  const { signOut } = useAuth();

  return (
    <button
      onClick={signOut}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '14px 20px',
        width: '100%',
        borderRadius: 16,
        border: '1px solid rgba(255,45,85,0.13)',
        background: 'rgba(255,45,85,0.08)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
      }}
    >
      <LogOut size={18} color="rgba(255,107,107,0.67)" />
      <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,107,107,0.67)' }}>Log Out</span>
    </button>
  );
}
