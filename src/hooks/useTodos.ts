import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Todo } from '../types/todo';
import * as todoService from '../services/todoService';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();

    const channel = supabase
      .channel('todos-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, () => {
        fetchTodos();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const addTodo = async (text: string, assigneeId: string, createdBy: string) => {
    await todoService.createTodo(text, assigneeId, createdBy);
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed } : t));
    await todoService.toggleTodo(id, completed);
  };

  const removeTodo = async (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    await todoService.deleteTodo(id);
  };

  return { todos, addTodo, toggleTodo, removeTodo, loading };
}
