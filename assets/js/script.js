const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const containerFim = document.querySelector(".containerFim");

let isJumping = false;
let isGameOver = false;
let position = 0;

const restartButton = document.querySelector(".restart");
restartButton.onclick = function () {
  restart();
};

const startButton = document.querySelector(".start");
startButton.onclick = function () {
  start();
  document.querySelector(".containerStart").classList.remove("active");
};

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

// touch
function touchKeyUp() {
  if (!isJumping) {
    jump();
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  if (isGameOver) return;

  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random()  * (3000 - 2000) + 2000;

  cactus.classList.add("cactus");
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + "px";

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60 || isGameOver) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over

      clearInterval(leftTimer);
      isGameOver = true;
      cactusPosition = 0;

      stop();

      return;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function removeCactu() {
  while (1) {
    const filho = background.querySelector(".cactus");
    if (filho !== null) {
      background.removeChild(filho);
    } else {
      break;
    }
  }
}

function stop() {
  containerFim.classList.add("active");
  document.removeEventListener("keyup", handleKeyUp);
  background.classList.remove("activeBackground");

  // touch
  window.removeEventListener("touchstart", touchKeyUp);
}

function start() {
  document.addEventListener("keyup", handleKeyUp);
  background.classList.add("activeBackground");
  createCactus();

  // touch
  window.addEventListener("touchstart", touchKeyUp);
}

function restart() {
  containerFim.classList.remove("active");
  isGameOver = false;
  removeCactu();
  start();
}
