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

  await pgClient.query("LISTEN table_changes");
  console.log("Listening for DB changes...");

  pgClient.on("notification", ({ channel, payload }) => {
    if (!payload) return;
    console.log("DB change received:", payload);

    const message = JSON.stringify({
      type: "db_change",
      channel,
      data: JSON.parse(payload),
    });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  });
};

connect();
