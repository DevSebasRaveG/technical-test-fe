import { Task, TaskFilter } from '../types/task';

export const useFilteredTasks = (tasks: Task[] | undefined, filter: TaskFilter) => {
  const getFilteredTasks = () => {
    if (!Array.isArray(tasks)) return [];
    
    return tasks.filter((task: Task) => {
      switch (filter) {
        case 'completed':
          return task.completed;
        case 'pending':
          return !task.completed;
        default:
          return true;
      }
    });
  };

  const getEmptyMessage = () => {
    return filter === 'all'
      ? 'No tasks yet. Add your first task!'
      : `No ${filter} tasks found.`;
  };

  return {
    filteredTasks: getFilteredTasks(),
    emptyMessage: getEmptyMessage(),
  };
};

