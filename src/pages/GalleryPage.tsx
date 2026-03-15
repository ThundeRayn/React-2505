import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAlbums } from '../hooks/useGallery';
import { useAuth } from '../hooks/useAuth';
import AlbumGrid from '../blocks/gallery/AlbumGrid';
import AlbumView from '../blocks/gallery/AlbumView';
import CreateAlbumModal from '../blocks/gallery/CreateAlbumModal';
import type { Album } from '../types/gallery';

export default function GalleryPage() {
  const { albums, createAlbum, loading } = useAlbums();
  const { user } = useAuth();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const totalPhotos = albums.reduce((sum, a) => sum + (a.photo_count || 0), 0);

  if (selectedAlbum) {
    return <AlbumView album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>Gallery</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 500 }}>{totalPhotos} shared photos</p>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading albums...</p>
      ) : (
        <AlbumGrid albums={albums} onSelect={setSelectedAlbum} />
      )}

      <button
        onClick={() => setShowCreate(true)}
        className="glass-card"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '14px 16px', width: '100%', borderRadius: 16, cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.13)', background: 'rgba(255,255,255,0.06)',
          color: 'var(--text-secondary)', fontSize: 15, fontWeight: 500, fontFamily: 'inherit',
        }}
      >
        <Plus size={18} />
        <span>Create Album</span>
      </button>

      <CreateAlbumModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={async (name, tags, category) => {
          if (user) await createAlbum(name, tags, category, user.id);
        }}
      />
    </div>
  );
}
