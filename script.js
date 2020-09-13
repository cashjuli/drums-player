function playSounds(e) {
  //e stands for the "event", meaning each time user press any key. Each key contains an object, with an attribute called "keyCode", with a specific number. Those numbers are the value for the tags attribute called "data-key".
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); //Selects the audio that matchs the pressed key
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); // Selects the button that matchs the pressed key
  if (!audio) return; //This "if" stops the function if the user imputs a key that hasn't got an audio
  audio.currentTime = 0; //Rewinds audio to start each time user press key
  audio.play();
  key.classList.add(`playing`); //Adds class playing, that has a different css decoration
}

//Removes the playing class after the event has "ended"
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

// "transitionend" listens to the ending of the events, to call the above function.
const keys = document.querySelectorAll(`.key`);
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

// Listens everytime user press any key
window.addEventListener("keydown", playSounds);
