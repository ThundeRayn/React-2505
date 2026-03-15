import { useTodos } from '../hooks/useTodos';
import TodoList from '../blocks/todo/TodoList';
import AddTaskButton from '../blocks/todo/AddTaskButton';

export default function TodoPage() {
  const { todos, addTodo, toggleTodo, loading } = useTodos();
  const taskCount = todos.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>Shared To-Do</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 500 }}>
          4 members · {taskCount} task{taskCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Todo List */}
      {loading ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading tasks...</p>
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} />
      )}

      {/* Add Task */}
      <AddTaskButton onAdd={addTodo} />
    </div>
  );
}
