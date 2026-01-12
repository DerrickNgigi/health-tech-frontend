import React from 'react';
import { Edit2, Trash2, Calendar, Clock, AlertCircle } from 'lucide-react';
import type { Task } from '../types/task';
import { StatusBadge } from './StatusBadge';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete }) => {
  // Logic to determine if task is overdue
  const dueDateObj = task.due_date ? new Date(task.due_date) : null;
  const isOverdue = dueDateObj && dueDateObj < new Date() && task.status !== 'completed';

  return (
    <div className={`group bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden ${isOverdue ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-200'}`}>
      <div className="p-5 flex-1 flex flex-col">
        {/* Header: Badge & Actions */}
        <div className="flex justify-between items-start mb-3">
          <StatusBadge status={task.status} />
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(task)}
              className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
              title="Edit"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-1">{task.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">{task.description}</p>

        {/* Prominent Due Date Box */}
        {dueDateObj ? (
          <div className={`mt-auto flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            isOverdue 
              ? 'bg-red-50 text-red-700 border border-red-100' 
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            {isOverdue ? <AlertCircle className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
            <div className="flex flex-col leading-none">
              <span className="text-[10px] uppercase tracking-wider opacity-70 mb-0.5">
                {isOverdue ? 'Overdue' : 'Due Date'}
              </span>
              <span>
                {dueDateObj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-auto px-3 py-2 rounded-lg text-sm text-slate-400 border border-transparent">
            No deadline set
          </div>
        )}
      </div>

      {/* Footer: Created Date */}
      <div className="bg-slate-50 px-5 py-2 border-t border-slate-100 flex items-center justify-end text-xs text-slate-400">
        <div className="flex items-center gap-1.5" title="Created At">
           <Clock className="h-3 w-3" />
           Created: {new Date(task.create_date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};