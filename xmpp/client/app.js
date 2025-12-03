import { client, xml } from "@xmpp/client";

const xmpp = client({
  service: "xmpp://jabber.at:5222",
  domain: "jabber.at",
  username: "myuser",
  password: "mypass",
});

function updateStatus(message) {
  const statusDiv = document.getElementById("status");
  if (statusDiv) {
    statusDiv.textContent = message;
  }
}

xmpp.on("online", async (address) => {
  console.log("Connected as", address.toString());
  updateStatus(`Connected as ${address.toString()}`);

  const msg = xml(
    "message",
    { to: "someone@jabber.at", type: "chat" },
    xml("body", {}, "Hello from my test")
  );

  xmpp.send(msg);
});

xmpp.on("error", (err) => {
  console.error("XMPP Error:", err);
  updateStatus(`Error: ${err.message}`);
});

xmpp.on("offline", () => {
  console.log("Disconnected");
  updateStatus("Offline");
});

// Wire up the connect button
document.getElementById("connectBtn").addEventListener("click", async () => {
  const btn = document.getElementById("connectBtn");
  btn.disabled = true;
  updateStatus("Connecting...");

  try {
    await xmpp.start();
  } catch (err) {
    console.error("Connection failed:", err);
    updateStatus(`Failed to connect: ${err.message}`);
  } finally {
    btn.disabled = false;
  }
});
