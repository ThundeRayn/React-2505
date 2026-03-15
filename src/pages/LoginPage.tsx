import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User as UserIcon, Lock, Eye, EyeOff } from 'lucide-react';
import USERS from '../data/users.json';

export default function LoginPage() {
  const { signIn } = useAuth();
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);
    setError('');
    try {
      await signIn(selectedUser.email, password);
    } catch {
      setError('Wrong password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: 24, gap: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>2505Forever</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Choose your profile</p>

      {!selectedUser ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%', maxWidth: 320 }}>
          {USERS.map(u => (
            <button key={u.email} className="glass-card" onClick={() => setSelectedUser(u)}
              style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-primary)', cursor: 'pointer', borderRadius: 'var(--card-radius)' }}>
              <UserIcon size={32} strokeWidth={1.5} />
              <span style={{ fontSize: 16, fontWeight: 600 }}>{u.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 320 }}>
          <button type="button" className="glass-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--glass-border-strong)', background: 'var(--glass-bg)', color: 'var(--text-primary)', cursor: 'pointer', borderRadius: 'var(--card-radius)' }}
            onClick={() => { setSelectedUser(null); setPassword(''); setError(''); }}>
            <UserIcon size={24} />
            <span style={{ fontSize: 16, fontWeight: 600 }}>{selectedUser.name}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>Change</span>
          </button>

          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--card-radius)' }}>
            <Lock size={18} style={{ color: 'var(--text-muted)' }} />
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"
              style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 15, outline: 'none', fontFamily: 'inherit' }} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p style={{ color: 'var(--accent-red)', fontSize: 13 }}>{error}</p>}

          <button type="submit" disabled={loading || !password} className="glass-card"
            style={{ padding: 14, fontSize: 16, fontWeight: 600, cursor: 'pointer', background: 'rgba(255,255,255,0.15)', border: '1px solid var(--glass-border-strong)', color: 'var(--text-primary)', borderRadius: 'var(--card-radius)', opacity: loading || !password ? 0.5 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      )}
    </div>
  );
}
