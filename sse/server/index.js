import express from "express";
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache"); // prevent default cache from browser
  res.setHeader("Connection", "keep-alive"); //prevent connection to closed during quiet periods

  const interval = setInterval(() => {
    const currentDate = new Date();
    res.write(`data: ${currentDate.toISOString()}\n\n`); // \n and data: is required to work
  }, 2000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(3000, () => console.log("SSE on http://localhost:3000/events"));
