const { Socket } = require("dgram");

const initIo = (app) => {
  const http = require("http");
  const ioServer = http.createServer(app);
  const { Server } = require("socket.io");
  const cors = require("cors");

  global.io = new Server(ioServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  console.log(" -IO> server is initalized, set to global.io");
  return ioServer;
};

module.exports = { initIo };
