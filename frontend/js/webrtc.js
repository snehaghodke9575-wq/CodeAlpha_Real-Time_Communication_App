const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

let localStream;
let peer;

const config = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;
    });

socket.on("user-joined", async () => {
    peer = new RTCPeerConnection(config);
    localStream.getTracks().forEach(t => peer.addTrack(t, localStream));

    peer.ontrack = e => remoteVideo.srcObject = e.streams[0];

    peer.onicecandidate = e => {
        if (e.candidate)
            socket.emit("ice-candidate", { roomId, candidate: e.candidate });
    };

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.emit("offer", { roomId, offer });
});

socket.on("offer", async data => {
    peer = new RTCPeerConnection(config);
    localStream.getTracks().forEach(t => peer.addTrack(t, localStream));

    peer.ontrack = e => remoteVideo.srcObject = e.streams[0];

    peer.onicecandidate = e => {
        if (e.candidate)
            socket.emit("ice-candidate", { roomId, candidate: e.candidate });
    };

    await peer.setRemoteDescription(data.offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    socket.emit("answer", { roomId, answer });
});

socket.on("answer", data => {
    peer.setRemoteDescription(data.answer);
});

socket.on("ice-candidate", data => {
    peer.addIceCandidate(data.candidate);
});