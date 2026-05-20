const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let broadcaster = null;

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("becomeBroadcaster", () => {
        broadcaster = socket.id;
        console.log("Broadcaster:", broadcaster);
    });

    socket.on("play", (time) => {
        socket.broadcast.emit("play", time);
    });

    socket.on("pause", (time) => {
        socket.broadcast.emit("pause", time);
    });

    socket.on("seek", (time) => {
        socket.broadcast.emit("seek", time);
    });

    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id);

        if (socket.id === broadcaster) {
            broadcaster = null;
            io.emit("broadcasterLeft");
        }
    });

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});