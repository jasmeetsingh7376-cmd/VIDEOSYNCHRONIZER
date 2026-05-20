const socket = io();
const video = document.getElementById("video");

socket.emit("listener");

socket.on("play", (time) => {
    video.currentTime = time;
    video.play();
});

socket.on("pause", (time) => {
    video.currentTime = time;
    video.pause();
});

socket.on("seek", (time) => {
    video.currentTime = time;
});