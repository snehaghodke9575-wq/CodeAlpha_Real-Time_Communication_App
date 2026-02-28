const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let draw = false;

canvas.onmousedown = () => draw = true;
canvas.onmouseup = () => draw = false;

canvas.onmousemove = e => {
    if (!draw) return;
    ctx.fillRect(e.offsetX, e.offsetY, 2, 2);
    socket.emit("draw", { roomId, x: e.offsetX, y: e.offsetY });
};

socket.on("draw", d => {
    ctx.fillRect(d.x, d.y, 2, 2);
});