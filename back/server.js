const app = require('express')();
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const socket = require("socket.io");
const cors = require('cors');



connectDB()
app.use(cors())
app.use(require('express').json())
app.use(require('express').urlencoded({extended: false}))
app.use('/api', require('./routes/userRoutes'))
app.use('/api/messages', require('./routes/messageRoutes'))
const server = app.listen(port, () => {
    console.log(`listening on *:${port}`);
});

 const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
 });

 global.onlineUsers = new Map();
 
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })
 })