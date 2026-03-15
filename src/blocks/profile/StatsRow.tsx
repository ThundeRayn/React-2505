import GlassCard from '../../components/GlassCard';

interface Stat {
  value: string | number;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
}

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <div style={{ display: 'flex', gap: 12, height: 90, width: '100%' }}>
      {stats.map((stat, i) => (
        <GlassCard key={i} padding={16} gap={4} style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 22, fontWeight: 700 }}>{stat.value}</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>{stat.label}</span>
        </GlassCard>
      ))}
    </div>
  );
}
