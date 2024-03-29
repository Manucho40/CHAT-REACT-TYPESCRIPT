const app = require("express")();
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const socket = require("socket.io");
const cors = require("cors");
const corsConfig = {
  origin: "*",
  credentials: true,
};
connectDB();
app.use(cors(corsConfig));
app.use(require("express").json());
app.use(require("express").urlencoded({ extended: false }));
app.use("/api", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
const server = app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chasSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log({ data });
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
