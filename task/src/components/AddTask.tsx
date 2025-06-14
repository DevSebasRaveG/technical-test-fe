"use client";

import { useState } from "react";
import { useTasksContext, addTask } from "app/context/TasksContext";

export function AddTask() {
  const [title, setTitle] = useState("");
  const { dispatch } = useTasksContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask(dispatch, title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        className="w-full px-6 py-4 text-gray-700 bg-white/50 rounded-xl border-2 border-purple-100 
                 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-200 
                 placeholder:text-gray-400 shadow-sm transition-all duration-200"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r 
                 from-purple-500 to-pink-500 text-white rounded-lg transform 
                 transition-all duration-200 hover:scale-105 hover:shadow-lg 
                 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-50
                 disabled:cursor-not-allowed disabled:hover:scale-100"
        disabled={!title.trim()}
      >
        Add Task
      </button>
    </form>
  );
}
