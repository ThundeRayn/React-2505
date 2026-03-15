import { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';

interface AddTaskButtonProps {
  onAdd: (text: string, assigneeId: string, createdBy: string) => Promise<void>;
}

export default function AddTaskButton({ onAdd }: AddTaskButtonProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim() || !user) return;
    setLoading(true);
    try {
      await onAdd(text.trim(), user.id, user.id);
      setText('');
      setOpen(false);
    } catch (err) {
      console.error('Failed to add task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '14px 16px',
          width: '100%',
          borderRadius: 16,
          cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.13)',
          background: 'rgba(255,255,255,0.06)',
          color: 'var(--text-secondary)',
          fontSize: 15,
          fontWeight: 500,
          fontFamily: 'inherit',
        }}
      >
        <Plus size={18} />
        <span>Add Task</span>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="New Task">
        <Input
          value={text}
          onChange={setText}
          placeholder="What needs to be done?"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="glass-card"
          style={{
            padding: 14,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid var(--glass-border-strong)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--card-radius)',
            fontFamily: 'inherit',
            opacity: loading || !text.trim() ? 0.5 : 1,
            textAlign: 'center',
          }}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </Modal>
    </>
  );
}
