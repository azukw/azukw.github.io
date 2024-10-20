window.addEventListener('load', () => {

    const workSection = document.getElementById('main-content');

    setTimeout(() => {
        workSection.style.transform = 'translateY(0)';
        workSection.style.opacity = '1';
    }, 200);  
});

const character = document.getElementById('character');
const platforms = document.querySelectorAll('.platform');

let velocityX = 0;
let velocityY = 0;
let posX = 470; 
let posY = 485; 
let isJumping = false;
let isMoving = false; 
const gravity = 0.5; 
const jumpStrength = -19; 
const moveSpeed = 5; 

function applyGravity() {
    velocityY += gravity;
}

document.addEventListener('keydown', (event) => {
    isMoving = true; 

    if (event.key === 'ArrowRight') {
        velocityX = moveSpeed;
    }
    if (event.key === 'ArrowLeft') {
        velocityX = -moveSpeed;
    }
    if (event.key === ' ' && !isJumping || event.key === 'ArrowUp' && !isJumping) {
        velocityY = jumpStrength; 
        isJumping = true;
    }
});

character.addEventListener('click', () => {
    isMoving = true; 
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        velocityX = 0;
    }
});

const maxFallSpeed = 20; 

function checkCollision() {
    platforms.forEach(platform => {
        const platformRect = platform.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        if (characterRect.bottom >= platformRect.top &&
            characterRect.bottom <= platformRect.top + Math.abs(velocityY) && 
            characterRect.right > platformRect.left &&
            characterRect.left < platformRect.right &&
            velocityY >= 0) { 

            velocityY = 0; 
            posY = platformRect.top - characterRect.height; 
            isJumping = false;
        }

        if (characterRect.top <= platformRect.bottom &&
            characterRect.top >= platformRect.bottom - Math.abs(velocityY) && 
            characterRect.right > platformRect.left &&
            characterRect.left < platformRect.right &&
            velocityY < 0) { 

            velocityY = gravity; 
        }
    });
}

function applyGravity() {
    velocityY += gravity;

    if (velocityY > maxFallSpeed) {
        velocityY = maxFallSpeed;
    }
}

function gameLoop() {

    if (isMoving) {

        applyGravity();

        posX += velocityX;
        posY += velocityY;

        if (posX < 0) posX = 0;
        if (posX > window.innerWidth - character.offsetWidth) posX = window.innerWidth - character.offsetWidth;

        if (posY > window.innerHeight - character.offsetHeight) {
            posY = window.innerHeight - character.offsetHeight;
            velocityY = 0;
            isJumping = false;
        }

        character.style.left = posX + 'px';
        character.style.top = posY + 'px';

        checkCollision();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();