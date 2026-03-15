import Avatar from '../../components/Avatar';
import IconButton from '../../components/IconButton';
import { Pencil } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        padding: 24,
      }}
    >
      <Avatar src={user?.avatar_url} size={80} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>{user?.name || 'User'}</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>{user?.email}</span>
      </div>
      <IconButton icon={<Pencil size={14} color="rgba(255,255,255,0.8)" />} label="Edit Profile" />
    </div>
  );
}
