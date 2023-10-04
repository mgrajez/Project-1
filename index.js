const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart-button");
const mainScreen = document.getElementById("game-intro");
const endScreen = document.getElementById("game-end");
endScreen.style.display = "none";
const gameScreen = document.querySelector(".game");
const gameSection = document.querySelector("#game");
gameSection.style.display = "none";
const block = document.querySelector(".block");
const character = document.querySelector(".character");
let frameCounter = 1;
let speed = 3;
const arrayOfImages = [
  "./images/taco-stand.png",
  "./images/bowl-2.png",
  "./images/chili.png",
  "./images/celebration.png",
  "./images/pinata-1.png",
  "./images/skull.png",
  "./images/man.png",
  "./images/tequila.png",
  "./images/taco.png",
  "./images/flag.png",
  "./images/skull3.png",
  "./images/mexican-man.png",
  "./images/cactus.png",
  "./images/guitar.png",
  "./images/michelada.png",
  "./images/mexican-skull.png",
  "./images/pyramid.png",
  "./images/mexican-hat.png",
  "./images/bowl.png",
  "./images/margarita.png",
  "./images/maracas.png",
  "./images/skull2.png",
  "./images/cactus-3.png",
];

let counter = 0;
let position = gameScreen.getBoundingClientRect().width;
let myInterval = null;

startButton.addEventListener("click", () => {
  startGame();
});

restartButton.addEventListener("click", () => {
  replayGame();
});

function startGame() {
  mainScreen.style.display = "none";
  gameSection.style.display = "block";
  position = gameScreen.getBoundingClientRect().width;
  gameLoop();
}

function endGame() {
  gameSection.style.display = "none";
  endScreen.style.display = "block";
}

function replayGame() {
  endScreen.style.display = "none";
  gameSection.style.display = "block";
  counter = 0;
  position = gameScreen.getBoundingClientRect().width;
  gameLoop();
  speed = 3;
}

function jump() {
  character.classList.add("jump");
}
// setTimeout(() => {
//   character.classList.toggle("animate");
// }, 500);

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === " ") {
    jump();
  }
});
character.addEventListener("animationend", () =>
  character.classList.remove("jump")
);

// Obstacles

function gameLoop() {
  myInterval = setInterval(() => {
    frameCounter++;
    if (frameCounter % 600 === 0) {
      speed += 1;
    }
    position -= speed;
    block.style.left = position + "px";
    if (position < -50) {
      block.src = arrayOfImages[counter % arrayOfImages.length];
      counter++;
      position = gameScreen.getBoundingClientRect().width;
    }

    if (checkCollision(character, block)) {
      // alert("game over");
      clearInterval(myInterval);
      myInterval = null;
      // displayGameover();
      // dialog.show();
      endGame();
    }
  }, 1000 / 60);
}

function checkCollision(character, block) {
  const blockBounding = block.getBoundingClientRect();
  const characterBounding = character.getBoundingClientRect();

  const isInX =
    characterBounding.right > blockBounding.left &&
    characterBounding.left < blockBounding.right;
  const isInY =
    characterBounding.bottom > blockBounding.top &&
    characterBounding.top < blockBounding.bottom;

  return isInX && isInY;
}

// function displayGameover() {
//   const gameover = document.createElement("div");
//   gameover.classList.add("gameover");
//   gameover.innerHTML = "Game Over";
//   document.body.appendChild(gameover);
// }

// function show() {
//   document.getElementById("dialog").show();
// }
