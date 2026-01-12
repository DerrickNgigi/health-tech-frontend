import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Activity, AlertCircle, Search } from 'lucide-react';
import type { Task, CreateTaskPayload, TaskStatus } from '../types/task';
import { taskService } from '../services/api';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Initial Data Fetch
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAll();
      // Sort by create date (newest first)
      const sorted = data.sort((a, b) => 
        new Date(b.create_date).getTime() - new Date(a.create_date).getTime()
      );
      setTasks(sorted);
      setError(null);
    } catch (err) {
      setError('Could not load operational tasks. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Handlers
  const handleCreateOrUpdate = async (formData: CreateTaskPayload) => {
    setIsSubmitting(true);
    try {
      // Format payload (handle empty dates)
      const payload = {
        ...formData,
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null
      };

      if (editingTask) {
        await taskService.update(editingTask.id, payload);
      } else {
        await taskService.create(payload);
      }
      
      await loadTasks(); // Refresh list
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      alert('Failed to save task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this task?')) return;
    
    // Optimistic UI Update
    setTasks(prev => prev.filter(t => t.id !== id));
    
    try {
      await taskService.delete(id);
    } catch (err) {
      alert('Failed to delete task.');
      loadTasks(); // Revert on error
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Derived State
  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                HealthTech<span className="text-teal-600">Solutions</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            {(['all', 'pending', 'in_progress', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                  filter === f ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>

          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" />
            New Task
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="h-10 w-10 animate-spin mb-4 text-teal-600" />
            <p>Loading operations...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center text-red-600">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">{error}</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No tasks found</h3>
            <p className="text-slate-500 mt-1 max-w-sm mx-auto">
              There are no {filter !== 'all' ? filter.replace('_', ' ') : ''} tasks right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={openEditModal} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </main>

      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};