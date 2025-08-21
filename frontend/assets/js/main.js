console.log("script is runing");

const btn = document.querySelector(".btn--video--bg");
const video = document.querySelector(".btn--video--bg .btn__video");

btn.addEventListener("mouseenter", () => {
  video.playbackRate = 3;
});
btn.addEventListener("mouseleave", () => {
  video.playbackRate = 1;
});
