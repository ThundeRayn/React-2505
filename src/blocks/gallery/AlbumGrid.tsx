import type { Album } from '../../types/gallery';
import GlassCard from '../../components/GlassCard';
import Badge from '../../components/Badge';
import { ImageIcon } from 'lucide-react';

interface AlbumGridProps {
  albums: Album[];
  onSelect: (album: Album) => void;
}

export default function AlbumGrid({ albums, onSelect }: AlbumGridProps) {
  if (albums.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No albums yet. Create one!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {albums.map(album => (
        <GlassCard key={album.id} padding={16} gap={10} onClick={() => onSelect(album)} style={{ cursor: 'pointer' }}>
          <div style={{
            width: '100%',
            height: 80,
            borderRadius: 12,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {album.cover_url ? (
              <img src={album.cover_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <ImageIcon size={24} color="rgba(255,255,255,0.2)" />
            )}
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{album.name}</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Badge style={{ fontSize: 10, padding: '2px 8px' }}>{album.photo_count} photos</Badge>
            {album.tags?.slice(0, 2).map(tag => (
              <Badge key={tag} style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(255,255,255,0.08)' }}>{tag}</Badge>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
