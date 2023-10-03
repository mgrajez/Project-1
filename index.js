const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const mainScreen = document.getElementById("game-intro");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("game-end");
let game = null;

startButton.addEventListener("click", function () {
  startGame();
});

function startGame() {
  console.log("start game");
  gameScreen.classList.remove("hidden");
  mainScreen.classList.add("hidden");
  game = new Game();
  // game.start()
}

const character = document.querySelector(".character");
let position = 460;
function jump() {
  character.classList.add("jump");
}
// setTimeout(() => {
//   character.classList.toggle("animate");
// }, 500);

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "ArrowUp") {
    jump();
  }
});
character.addEventListener("animationend", () =>
  character.classList.remove("jump")
);

// Obstacles

const block = document.querySelector(".block");
setInterval(() => {
  position--;
  block.style.left = position + "px";
  if (position < -50) {
    position = 460;
  }

  checkCollision();
  // console.log(block);
}, 1000 / 60);

function checkCollision() {
  const blockBounding = block.getBoundingClientRect();
  const characterBounding = character.getBoundingClientRect();

  const isInX = characterBounding.right > blockBounding.left;
  const isInY = characterBounding.bottom > blockBounding.top;

  if (position === 30) {
    console.log(blockBounding, characterBounding);
    debugger;

    return isInX && isInY;
  }
}
