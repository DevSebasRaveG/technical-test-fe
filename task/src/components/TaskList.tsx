"use client";

import { useTasksContext } from "app/context/TasksContext";
import { useFilteredTasks } from "app/hooks/useFilteredTasks";
import { TaskItem } from "app/components/TaskItem";

export function TaskList() {
  const { state } = useTasksContext();
  const { tasks, filter } = state;
  const { filteredTasks, emptyMessage } = useFilteredTasks(tasks, filter);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
