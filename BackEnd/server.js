const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const questionRoutes = require('./routes/questionRoutes')
const { Connection } = require('./databaseConnection/connection');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());
app.use("/questions", questionRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("update", () => {
    io.emit("refresh");
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.listen(PORT, () => {
  Connection();
  console.log(`App up and running in port ${PORT}`);

})
//