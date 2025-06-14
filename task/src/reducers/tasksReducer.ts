import { TaskAction, TaskState } from "app/types/task";

export const initialState: TaskState = {
  tasks: [],
  filter: "all",
};

export function tasksReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
}
