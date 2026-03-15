import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { Photo } from '../../types/gallery';

interface PhotoCardProps {
  photo: Photo;
  onDelete: (id: string, storagePath: string) => void;
}

export default function PhotoCard({ photo, onDelete }: PhotoCardProps) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.09)',
        height: 160,
      }}
      onClick={() => setShowDelete(!showDelete)}
    >
      <img
        src={photo.url}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {showDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(photo.id, photo.storage_path); }}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 32,
            height: 32,
            borderRadius: 16,
            background: 'rgba(255,45,85,0.8)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Trash2 size={14} color="#fff" />
        </button>
      )}
    </div>
  );
}
