const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New WebSocket connection established");

  setInterval(() => {
    const mockData = {
      timestamp: Date.now(),
      value: Math.random() * 100,
      priority: Math.random() < 0.2 ? "high" : "normal",
    };

    socket.emit("data", mockData);
  }, 1000);
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
