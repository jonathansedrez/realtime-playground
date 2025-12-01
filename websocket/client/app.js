let socket;
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

let clientId;
function connect() {
  clientId = crypto.randomUUID();
  socket = new WebSocket("ws://localhost:8080");

  socket.addEventListener("open", () => {
    console.log("Connected to server");
  });
  socket.addEventListener("message", (event) => {
    const { id, message } = JSON.parse(event.date);
    if (id !== clientId) {
      const p = document.createElement("p");
      p.textContent = `${id}: ${message}`;
      messagesDiv.appendChild(p);
    }
  });
  socket.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });
  socket.addEventListener("close", () => {
    setTimeout(connect, 1000);
  });
}

connect();

sendBtn.addEventListener("click", () => {
  const message = messageInput.value;
  if (message.trim()) {
    socket.send(
      JSON.stringify({
        id: clientId,
        message,
      })
    );
    const p = document.createElement("p");
    p.textContent = `You: ${message}`;
    messagesDiv.appendChild(p);
    messageInput.value = "";
  }
});
