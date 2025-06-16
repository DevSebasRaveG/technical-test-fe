export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type TaskFilter = 'all' | 'completed' | 'pending';

export type TaskState = {
  tasks: Task[];
  filter: TaskFilter;
};

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: TaskFilter }
  | { type: 'SET_TASKS'; payload: Task[] };

