"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { Task, TaskAction, TaskState } from "app/types/task";
import { tasksReducer, initialState } from "app/reducers/tasksReducer";
// import { WebSocketService } from "app/services/websocket";
import { TasksAPI } from "app/services/api";

type TasksContextType = {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  // const wsService = WebSocketService.getInstance();

  useEffect(() => {
    // Cargar tareas iniciales
    const loadTasks = async () => {
      try {
        const tasks = await TasksAPI.getAllTasks();
        dispatch({ type: "SET_TASKS", payload: tasks });
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    loadTasks();

    // Configurar WebSocket para nuevas tareas
    // wsService.onNewTask((task: Task) => {
    //   dispatch({ type: "ADD_TASK", payload: task });
    // });
    //
    // return () => {
    //   wsService.disconnect();
    // };
  }, []);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
}

// Acciones del contexto integrando API REST y WebSocket
export const addTask = async (
  dispatch: React.Dispatch<TaskAction>,
  title: string,
) => {
  try {
    // Crear tarea via API REST
    const newTask = await TasksAPI.createTask(title);

    if (newTask) {
      // Emitir al WebSocket para notificar a otros clientes
      // WebSocketService.getInstance().emitNewTask(newTask);

      // Actualizar estado local
      dispatch({ type: "ADD_TASK", payload: newTask });
    }
  } catch (error) {
    console.error("Failed to add task:", error);
    throw error;
  }
};

export const toggleTask = async (
  dispatch: React.Dispatch<TaskAction>,
  taskId: string,
  currentTask: Task,
) => {
  try {
    // Enviar todos los campos obligatorios en el PUT request
    const updatedTaskData = {
      title: currentTask.title,
      completed: !currentTask.completed,
    };

    await TasksAPI.updateTask(taskId, updatedTaskData);
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  } catch (error) {
    console.error("Failed to toggle task:", error);
    throw error;
  }
};

export const deleteTask = async (
  dispatch: React.Dispatch<TaskAction>,
  taskId: string,
) => {
  try {
    await TasksAPI.deleteTask(taskId);
    dispatch({ type: "DELETE_TASK", payload: taskId });
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};

export const setFilter = (
  dispatch: React.Dispatch<TaskAction>,
  filter: TaskState["filter"],
) => {
  dispatch({ type: "SET_FILTER", payload: filter });
};

export const setTasks = (
  dispatch: React.Dispatch<TaskAction>,
  tasks: Task[],
) => {
  dispatch({ type: "SET_TASKS", payload: tasks });
};
