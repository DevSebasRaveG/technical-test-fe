import { Task } from "../types/task";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const TasksAPI = {
  // Obtener todas las tareas
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/`);
      if (!response.ok) {
        console.error("Error status:", response.status);
        return [];
      }
      const result = await response.json();
      return result.data; // Extract tasks from the data property
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },

  // Obtener una tarea específica
  async getTask(taskId: string): Promise<Task | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`);
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to parse error response" }));
        console.error("Error fetching task:", response.status, errorData);
        return null;
      }
      const result = await response.json();
      return result.data; // Expect data under a 'data' property
    } catch (error) {
      console.error("Error fetching task:", error);
      return null;
    }
  },

  // Crear una nueva tarea
  async createTask(title: string): Promise<Task | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to parse error response" }));
        console.error("Error creating task:", response.status, errorData);
        return null;
      }
      const result = await response.json();
      return result.data; // Extract task from the data property
    } catch (error) {
      console.error("Error creating task:", error);
      return null;
    }
  },

  // Actualizar una tarea
  async updateTask(
    taskId: string,
    updates: Partial<Task>,
  ): Promise<Task | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to parse error response" }));
        console.error("Error updating task:", response.status, errorData);
        return null;
      }
      const result = await response.json();
      return result.data; // Expect data under a 'data' property
    } catch (error) {
      console.error("Error updating task:", error);
      return null;
    }
  },

  // Eliminar una tarea
  async deleteTask(taskId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
  },
};
