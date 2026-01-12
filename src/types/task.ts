export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  create_date: string;
  due_date: string | null;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  status?: TaskStatus;
  due_date?: string | null;
}