"use client";

import { Task } from "app/types/task";
import {
  useTasksContext,
  toggleTask,
  deleteTask,
} from "app/context/TasksContext";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { dispatch } = useTasksContext();

  return (
    <li
      className="group bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm
                 border-2 border-transparent hover:border-purple-200
                 transition-all duration-200 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(dispatch, task.id, task)}
              className="w-5 h-5 border-2 border-purple-300 rounded-md
                       checked:bg-gradient-to-r checked:from-purple-500 checked:to-pink-500
                       checked:border-transparent focus:ring-2 focus:ring-purple-200
                       transition-all duration-200"
            />
          </div>
          <span
            className={`flex-1 min-w-0 overflow-hidden overflow-ellipsis whitespace-nowrap
                     ${
                       task.completed
                         ? "text-gray-400 line-through"
                         : "text-gray-700"
                     }`}
          >
            {task.title}
          </span>
        </div>
        <button
          onClick={() => deleteTask(dispatch, task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200
                   opacity-0 group-hover:opacity-100 focus:opacity-100
                   p-1 hover:bg-red-50 rounded-lg"
          aria-label="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
