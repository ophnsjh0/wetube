const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContent = document.getElementById("videoContent");

let volumeValue = 0.5;
video.volume = volumeValue;


const handlePlayClick = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
}
// const handlePause = () => (playBtn.innerText = "Play");
// const handlePlay = () => (playBtn.innerText = "Puase");
// video.addEventListener("play", handlePlay);
// video.addEventListener("pause", handlePause);

const handleMute = (e) => {
    if (video.muted){
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
}
 
const handleVolume = (event) => {
    // console.log(e.target.value);
    const { target: { value }, } = event;
    if (video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";   
    }
    volumeValue = value;
    video.volume = volumeValue;
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);


const handleLoadedMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeLine.max = Math.floor(video.duration);
}

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeLine.value = Math.floor(video.currentTime);
}

const handleTimeLineChange = (event) => {
    const { target: { value }} =  event;
    video.currentTime = value;
}

const handleFullScreen = () => {
    const fullScreen =  document.fullscreenElement;
    if(fullScreen){
        fullScreenBtn.innerText = "Enter FullScreen";
        document.exitFullscreen();
    } else {
        fullScreenBtn.innerText = "Exit FullScreen";   
        videoContent.requestFullscreen();
    }
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);



