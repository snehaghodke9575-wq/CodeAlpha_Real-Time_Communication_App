const socket = io("http://localhost:5000");
const roomId = new URLSearchParams(window.location.search).get("room");

socket.on("connect", () => {
    socket.emit("join-room", roomId);
});