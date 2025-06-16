import { Task } from "../types/task";

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

export class WebSocketService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;
  private onNewTaskCallback: ((task: Task) => void) | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private isConnecting = false;

  private constructor() {
    if (!WEBSOCKET_URL) {
      console.error("NEXT_PUBLIC_WEBSOCKET_URL is not defined");
      throw new Error("WebSocket URL is not configured");
    }

    this.connectWebSocket();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private connectWebSocket(): void {
    console.log("se esta conectando");
    if (this.isConnecting || !WEBSOCKET_URL) return;
    this.isConnecting = true;

    try {
      this.socket = new WebSocket(WEBSOCKET_URL);

      this.socket.onopen = () => {
        console.log("✅ Connected to WebSocket server");
        this.reconnectAttempts = 0;
        this.isConnecting = false;
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📥 Message received:", data);

          if (data?.type === "newTask" && data.task) {
            if (this.onNewTaskCallback) {
              this.onNewTaskCallback(data.task);
            }
          }
        } catch (error) {
          console.error("❌ Error parsing message:", event.data);
        }
      };

      this.socket.onclose = (event) => {
        console.warn("⚠️ Disconnected:", event.reason);
        this.isConnecting = false;
        this.handleReconnect();
      };

      this.socket.onerror = (event) => {
        console.error("❌ WebSocket error:", event);
        this.isConnecting = false;
        this.handleReconnect();
      };
    } catch (error) {
      console.error("❌ WebSocket connection error:", error);
      this.handleReconnect();
    }
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("🛑 Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * this.reconnectAttempts;

    console.log(
      `🔁 Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
    );

    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);

    this.reconnectTimeout = setTimeout(() => {
      this.connectWebSocket();
    }, delay);
  }

  public emitNewTask(task: Task): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ type: "createTask", task });
      this.socket.send(message);
      console.log("📤 Task sent:", message);
    } else {
      console.error(
        `🚫 Cannot send, WebSocket not connected (readyState=${this.socket?.readyState})`,
      );
    }
  }

  public onNewTask(callback: (task: Task) => void): void {
    this.onNewTaskCallback = callback;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }
}
