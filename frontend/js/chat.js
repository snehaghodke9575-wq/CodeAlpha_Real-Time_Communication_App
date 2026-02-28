const chat = document.getElementById("chat");
const msg = document.getElementById("msg");

function send() {
    socket.emit("chat", { roomId, text: msg.value });
    chat.innerHTML += "<p>You: " + msg.value + "</p>";
    msg.value = "";
}

socket.on("chat", data => {
    chat.innerHTML += "<p>Peer: " + data.text + "</p>";
});