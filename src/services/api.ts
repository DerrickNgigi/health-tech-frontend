import type { Task, CreateTaskPayload } from '../types/task';

// Access the environment variable defined in .env
// If variable is missing, fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333/api/tasks';

export const taskService = {
  // Get all tasks
  getAll: async (): Promise<Task[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  // Create a new task
  create: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  // Update an existing task
  update: async (id: string, payload: Partial<CreateTaskPayload>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  // Delete a task
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  },
};