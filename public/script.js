const socket = io();

const video = document.getElementById("video");
const broadcasterBtn = document.getElementById("broadcasterBtn");
const timeDisplay = document.getElementById("time");
const connection = document.getElementById("connection");

let isBroadcaster = false;

broadcasterBtn.onclick = () => {

    isBroadcaster = true;

    socket.emit("becomeBroadcaster");

    alert("You are now the Broadcaster");

};

video.addEventListener("play", () => {

    if(isBroadcaster){
        socket.emit("play", video.currentTime);
    }

});

video.addEventListener("pause", () => {

    if(isBroadcaster){
        socket.emit("pause", video.currentTime);
    }

});

video.addEventListener("seeked", () => {

    if(isBroadcaster){
        socket.emit("seek", video.currentTime);
    }

});

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

socket.on("broadcasterLeft", () => {

    alert("Broadcaster disconnected");

});

setInterval(() => {

    timeDisplay.innerText = video.currentTime.toFixed(2);

}, 500);

socket.on("connect", () => {

    connection.innerText = "Connected";

});

socket.on("disconnect", () => {

    connection.innerText = "Disconnected";

});