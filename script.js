function playSounds(e) {
  //e stands for the "event", meaning each time user press any key
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; //This if stops the function if the user imputs a key that hasen't got an audio
  audio.currentTime = 0; //Rewinds audio to start each time user press key
  audio.play();
  key.classList.add(`playing`);
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(`.key`);
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playSounds); // Listens everytime user press any key
