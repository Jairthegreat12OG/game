// Game JavaScript
const mario = document.getElementById('mario');
const game = document.getElementById('game');
const platform = document.querySelector('.platform');
const groundHeight = 50;
let marioLeft = 100;
let marioBottom = 50;
let isJumping = false;
let velocity = 0;
const gravity = 0.5;

// Set Mario's initial position
mario.style.left = marioLeft + 'px';
mario.style.bottom = marioBottom + 'px';

// Handle Mario's movement based on key presses
function moveMario(e) {
  if (e.key === 'ArrowRight') {
    marioLeft += 10;
    mario.style.left = marioLeft + 'px';
  } else if (e.key === 'ArrowLeft') {
    marioLeft -= 10;
    mario.style.left = marioLeft + 'px';
  } else if (e.key === ' ' && !isJumping) {
    isJumping = true;
    velocity = 10;  // Jump velocity
  }
}

// Check for platform collision
function checkPlatformCollision() {
  if (
    marioLeft + 50 > platform.offsetLeft &&
    marioLeft < platform.offsetLeft + platform.offsetWidth &&
    marioBottom <= platform.offsetHeight + 50
  ) {
    isJumping = false;
    marioBottom = platform.offsetHeight + 50;
    velocity = 0;
  }
}

// Update game state every frame
function gameLoop() {
  if (isJumping) {
    marioBottom += velocity;
    velocity -= gravity;  // Apply gravity

    // Stop Mario when he hits the ground
    if (marioBottom <= groundHeight) {
      marioBottom = groundHeight;
      isJumping = false;
    }

    checkPlatformCollision();  // Check for platform collision
    mario.style.bottom = marioBottom + 'px';
  }
}

// Event listener for keyboard input
document.addEventListener('keydown', moveMario);

// Game loop: update every 20ms
setInterval(gameLoop, 20);
