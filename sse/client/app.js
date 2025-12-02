const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");

let sse;

connectBtn.addEventListener("click", () => {
  if (sse) return;

  sse = new EventSource("http://localhost:3000/events");

  sse.onopen = () => {
    console.log("Connection opened");
  };

  sse.onmessage = (event) => {
    const p = document.createElement("p");
    p.textContent = event.data;
    document.body.appendChild(p);
  };

  sse.onerror = (error) => {
    console.error("Connection error:", error);
  };
});

disconnectBtn.addEventListener("click", () => {
  if (!sse) return;
  console.log("Connection closed");
  sse.close();
});
