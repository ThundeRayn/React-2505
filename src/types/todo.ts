export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  assignee_id: string;
  created_by: string;
  created_at: string;
  assignee_name?: string;
}
