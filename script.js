//exercise 1 ----------------------------------------------------------------------------------
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

//exercise 2 Analogic Clock-------------------------------------------------------------------------------------
const secondHand = document.querySelector(".second-hand");
const minutesHand = document.querySelector(".min-hand");
const hoursHand = document.querySelector(".hour-hand");

function setDate() {
  const now = new Date();
  // Calculates the current second, then calculates the <º degrees of that second on the clock, and finally moves the hand to the correspondent position
  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  // Calculates the current minute, then calculates the <º degrees of that min on the clock, and finally moves the hand to the correspondent position
  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + 90;
  minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;

  // Calculates the current hour, then calculates the <º degrees of that hour on the clock, and finally moves the hand to the correspondent position
  const hours = now.getHours();
  const hoursDegrees = (hours / 12) * 360 + 90;
  hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;

  if (seconds >= 59) {
    secondHand.style.transition = `none`;
    secondHand.style.transform = `rotate(90deg)`;
  } else {
    secondHand.style.transition = `all 0.5s cubic-bezier(0.82, 0.29, 0, 1.7)`;
  } //Bug fix, because each time the seconds-hand arrived to 60 it would go back to 0 in reverse, instead of continueing. This "if" stops the transition at second 59, and starts again at second 0 of the next minute
}

setInterval(setDate, 1000); //calls the function each second (every 1000 miliseconds)

//Exercise 3 Update variables with JS
const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
  const suffix = this.dataset.sizing || ""; // Blur and spacing need suffix "px", but the color doesnt need any. Since the color class doesnt have a "data-sizing", it needs the || "" to prevent a bug.
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  ); //adds the CSS attribute, first name, then value, and the suffix (px or nothing for the color.)
}

inputs.forEach((input) => input.addEventListener("change", handleUpdate)); //calls update function everytime there is a click change
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate)); // calls function everytime the user moves the imput, while clicking because of the line before.

// Exercise 5 -----------------------------------------------------------
const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  this.classList.toggle("open");
}

function toggleActive(event) {
  if (event.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleActive)
);
