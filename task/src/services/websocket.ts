import { Socket, io } from "socket.io-client";
import { Task } from "../types/task";

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

export class WebSocketService {
  private static instance: WebSocketService;
  private socket: Socket;
  private onNewTaskCallback: ((task: Task) => void) | null = null;

  private constructor() {
    if (!WEBSOCKET_URL) {
      console.error("NEXT_PUBLIC_WEBSOCKET_URL is not defined");
      throw new Error("WebSocket URL is not configured");
    }

    this.socket = io(WEBSOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      timeout: 20000,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.setupListeners();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private setupListeners(): void {
    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    this.socket.on("newTask", (task: Task) => {
      console.log("New task received:", task);
      if (this.onNewTaskCallback) {
        this.onNewTaskCallback(task);
      }
    });

    this.socket.on("error", (error: Error) => {
      console.error("WebSocket error:", error);
    });
  }

  public emitNewTask(task: Task): void {
    this.socket.emit("createTask", task);
  }

  public onNewTask(callback: (task: Task) => void): void {
    this.onNewTaskCallback = callback;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
