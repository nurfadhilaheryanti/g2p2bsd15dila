if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const router = require("./routers");
const cors = require("cors");
const port = process.env.PORT || 3000
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173"
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

io.on("connection", (socket) => {

	//video
	console.log("a user connected:", socket.id);
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  //chat
  if (socket.handshake.auth) {
    console.log("fullName : " + socket.handshake.auth.fullName);
  }

  socket.on("message:new", (message) => {
    io.emit("message:update", {
      from: socket.handshake.auth.fullName,
      message,
    });
  });
});

server.listen(port, () => console.log("server is running on port", port));
