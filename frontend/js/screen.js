async function share() {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  const sender = peer.getSenders().find(s => s.track.kind === "video");
  sender.replaceTrack(stream.getVideoTracks()[0]);
}