const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", socket => {

  socket.on("join-room", roomId => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("offer", data => {
    socket.to(data.roomId).emit("offer", data);
  });

  socket.on("answer", data => {
    socket.to(data.roomId).emit("answer", data);
  });

  socket.on("ice-candidate", data => {
    socket.to(data.roomId).emit("ice-candidate", data);
  });

  socket.on("chat", data => {
    socket.to(data.roomId).emit("chat", data);
  });

  socket.on("file", data => {
    socket.to(data.roomId).emit("file", data);
  });

  socket.on("draw", data => {
    socket.to(data.roomId).emit("draw", data);
  });

});

server.listen(5000);