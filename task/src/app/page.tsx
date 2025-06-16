'use client';

import { AddTask } from "app/components/AddTask";
import { TaskList } from "app/components/TaskList";
import { FilterControls } from "app/components/FilterControls";
import { TasksProvider } from "app/context/TasksContext";

export default function Home() {
  return (
    <TasksProvider>
      <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Task Manager
          </h1>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 space-y-6">
            <AddTask />
            <FilterControls />
            <TaskList />
          </div>
        </div>
      </main>
    </TasksProvider>
  );
}
