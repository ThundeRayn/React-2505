import ProfileCard from '../blocks/profile/ProfileCard';
import StatsRow from '../blocks/profile/StatsRow';
import LocationSettings from '../blocks/profile/LocationSettings';
import SettingsList from '../blocks/profile/SettingsList';
import LogoutButton from '../blocks/profile/LogoutButton';

export default function ProfilePage() {
  // Stats would come from real data in the future
  const stats = [
    { value: '—', label: 'Tasks Done' },
    { value: '—', label: 'Photos' },
    { value: '—', label: 'Days Active' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>Profile</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 500 }}>Manage your account</p>
      </div>
      <ProfileCard />
      <StatsRow stats={stats} />
      <LocationSettings />
      <SettingsList />
      <LogoutButton />
    </div>
  );
}
