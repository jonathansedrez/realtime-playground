import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on("connection", (ws) => {
  ws.isAlive = true;
  ws.on("pong", () => (ws.isAlive = true));

  ws.on("message", (msg) => {
    for (const client of wss.clients) {
      if (client.readyState === 1) {
        console.log("client", client);
        client.send(msg.toString());
      }
    }
  });
});
