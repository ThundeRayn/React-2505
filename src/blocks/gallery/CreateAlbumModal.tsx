import { useState } from 'react';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

interface CreateAlbumModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, tags: string[], category: string | null) => Promise<void>;
}

export default function CreateAlbumModal({ open, onClose, onCreate }: CreateAlbumModalProps) {
  const [name, setName] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      await onCreate(name.trim(), tags, category.trim() || null);
      setName('');
      setTagsInput('');
      setCategory('');
      onClose();
    } catch (err) {
      console.error('Failed to create album:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="New Album">
      <Input value={name} onChange={setName} placeholder="Album name" />
      <Input value={tagsInput} onChange={setTagsInput} placeholder="Tags (comma-separated)" />
      <Input value={category} onChange={setCategory} placeholder="Category (optional)" />
      <button
        onClick={handleCreate}
        disabled={loading || !name.trim()}
        className="glass-card"
        style={{
          padding: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer',
          background: 'rgba(255,255,255,0.15)', border: '1px solid var(--glass-border-strong)',
          color: 'var(--text-primary)', borderRadius: 'var(--card-radius)', fontFamily: 'inherit',
          opacity: loading || !name.trim() ? 0.5 : 1, textAlign: 'center',
        }}
      >
        {loading ? 'Creating...' : 'Create Album'}
      </button>
    </Modal>
  );
}
