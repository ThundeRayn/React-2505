import { useRef } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import type { Album } from '../../types/gallery';
import { usePhotos } from '../../hooks/useGallery';
import { useAuth } from '../../hooks/useAuth';
import PhotoCard from './PhotoCard';

interface AlbumViewProps {
  album: Album;
  onBack: () => void;
}

export default function AlbumView({ album, onBack }: AlbumViewProps) {
  const { photos, uploadPhoto, deletePhoto, loading } = usePhotos(album.id);
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    await uploadPhoto(file, user.id);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-secondary)' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{album.name}</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{photos.length} photos</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 16,
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
            color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <Upload size={14} /> Upload
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading photos...</p>
      ) : photos.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', padding: 40 }}>No photos yet. Upload some!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {photos.map(photo => (
            <PhotoCard key={photo.id} photo={photo} onDelete={deletePhoto} />
          ))}
        </div>
      )}
    </div>
  );
}
