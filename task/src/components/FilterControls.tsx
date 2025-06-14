"use client";

import { useTasksContext, setFilter } from "app/context/TasksContext";
import type { TaskFilter } from "app/types/task";

export function FilterControls() {
  const { state, dispatch } = useTasksContext();
  const { filter } = state;

  const filters: TaskFilter[] = ["all", "completed", "pending"];

  return (
    <div className="flex flex-wrap gap-3 justify-center py-2">
      {filters.map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => setFilter(dispatch, filterOption)}
          className={`px-6 py-2.5 rounded-full font-medium tracking-wide 
            transition-all duration-200 shadow-sm border-2
            ${
              filter === filterOption
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent"
                : "bg-white/50 text-gray-600 border-purple-100 hover:border-purple-300 hover:bg-white/80"
            }`}
        >
          {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
        </button>
      ))}
    </div>
  );
}
