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
  "./images/cactus-4.png",
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
const characterImages = {
  run: ["./images/jumpy-run1.png", "./images/jumpy-run2.png"],
  crouch: "./images/jumpy-crouch.png",
};
const sound = {
  jumpSound: new Audio("/music/jump-sound.mp3"),
  gameOverSound: new Audio("/music/game-over-sound.mp3"),
};

let characterState = "running";
let imageCounter = 0;
let counter = 0;
let position = gameScreen.getBoundingClientRect().width;
let myInterval = null;
let level = 1;
let time = 0;

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
  speed = 3;
  level = 1;
  updateLevel();
  gameLoop();
}

function jump() {
  character.classList.add("jump");
}

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === " ") {
    jump();
    sound.jumpSound.play();
  } else if (event.key === "ArrowDown") {
    characterState = "crouching";
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowDown") {
    characterState = "running";
  }
});

character.addEventListener("animationend", () =>
  character.classList.remove("jump")
);

function updateLevel() {
  document.getElementById("level-counter").textContent = "Level " + level;
}

// const myLevel = setInterval(() => {
//   time += 20;
//   updateLevel();

//   if (checkCollision(character, block)) {
//     clearInterval(myLevel);
//   }
// }, 20000);

// Obstacles

function gameLoop() {
  myInterval = setInterval(() => {
    frameCounter++;
    if (frameCounter % 600 === 0) {
      speed += 1;
    }
    if (frameCounter % 1200 === 0) {
      level++;
      updateLevel();
    }
    if (characterState === "crouching") {
      character.src = characterImages.crouch;
    } else {
      if (frameCounter % 15 === 0) {
        imageCounter++;
      }
      character.src =
        characterImages.run[imageCounter % characterImages.run.length];
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
      sound.gameOverSound.play();
      // endGame();
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
