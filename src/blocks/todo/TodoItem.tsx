import Checkbox from '../../components/Checkbox';
import type { Todo } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 16,
      }}
    >
      <Checkbox checked={todo.completed} onChange={onToggle} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        <span style={{
          fontSize: 15,
          fontWeight: 500,
          color: todo.completed ? 'rgba(255,255,255,0.56)' : 'rgba(255,255,255,0.9)',
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}>
          {todo.text}
        </span>
        <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.27)' }}>
          {todo.assignee_name}
        </span>
      </div>
    </div>
  );
}
