const socket = io();
const video = document.getElementById("video");

socket.emit("broadcaster");

video.addEventListener("play", () => {
    socket.emit("play", video.currentTime);
});

video.addEventListener("pause", () => {
    socket.emit("pause", video.currentTime);
});

video.addEventListener("seeked", () => {
    socket.emit("seek", video.currentTime);
});