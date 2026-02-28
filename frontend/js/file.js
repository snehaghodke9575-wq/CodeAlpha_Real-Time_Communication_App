const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

fileInput.onchange = () => {
    const file = fileInput.files[0];
    const r = new FileReader();

    r.onload = () => {
        socket.emit("file", {
            roomId,
            name: file.name,
            data: r.result
        });
    };

    r.readAsDataURL(file);
};

socket.on("file", data => {
    const a = document.createElement("a");
    a.href = data.data;
    a.download = data.name;
    a.textContent = data.name;
    fileList.appendChild(a);
    fileList.appendChild(document.createElement("br"));
});