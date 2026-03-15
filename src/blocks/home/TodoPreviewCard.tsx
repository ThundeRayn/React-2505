import GlassCard from '../../components/GlassCard';
import Badge from '../../components/Badge';
import Checkbox from '../../components/Checkbox';
import { useTodos } from '../../hooks/useTodos';

export default function TodoPreviewCard() {
  const { todos, toggleTodo, loading } = useTodos();
  const preview = todos.slice(0, 3);
  const pendingCount = todos.filter(t => !t.completed).length;

  return (
    <GlassCard padding={20} gap={14} style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 0.5, color: 'rgba(255,255,255,0.67)' }}>Shared To-Do</span>
        <Badge>{pendingCount}</Badge>
      </div>
      {loading ? (
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Loading...</span>
      ) : preview.length === 0 ? (
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>No tasks yet</span>
      ) : (
        preview.map(todo => (
          <div key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
            <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id, !todo.completed)} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              <span style={{
                fontSize: 15, fontWeight: 500,
                color: todo.completed ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.9)',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}>{todo.text}</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.33)' }}>— {todo.assignee_name}</span>
            </div>
          </div>
        ))
      )}
    </GlassCard>
  );
}
