import { Client, type ClientConfig } from "pg";
import { WebSocketServer, type WebSocket } from "ws";

const config: ClientConfig = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "syncpoc",
};

const pgClient = new Client(config);

const wss = new WebSocketServer({ port: 8001 });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (data: Buffer) => {
    console.log("Received:", data.toString());
    ws.send(`Echo: ${data.toString()}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const connect = async (): Promise<void> => {
  await pgClient.connect();
  console.log("Postgres connected");
  console.log("WebSocket server running on ws://localhost:8001");
};

connect();
