window.addEventListener('load', () => {
    // Get the work section container
    const workSection = document.getElementById('main-content');

    // Add a slight delay to make sure the transition feels smooth
    setTimeout(() => {
        workSection.style.transform = 'translateY(0)';
        workSection.style.opacity = '1';
    }, 200);  // 200ms delay for a smooth load-in
});

// Sélection du personnage et des plateformes
const character = document.getElementById('character');
const platforms = document.querySelectorAll('.platform');

// Variables de mouvement
let velocityX = 0;
let velocityY = 0;
let posX = 0; // Position initiale X
let posY = 1000; // Position initiale Y
let isJumping = false;
const gravity = 0.5; // Gravité simulée
const jumpStrength = -19; // Force de saut
const moveSpeed = 5; // Vitesse de déplacement

// Appliquer la gravité même sans saut
function applyGravity() {
    velocityY += gravity;
}

// Écouteur des touches du clavier
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        velocityX = moveSpeed;
    }
    if (event.key === 'ArrowLeft') {
        velocityX = -moveSpeed;
    }
    if (event.key === ' ' && !isJumping || event.key === 'ArrowUp' && !isJumping) {
        velocityY = jumpStrength; // Sauter
        isJumping = true;
    }
});

// Arrêt du mouvement horizontal quand la touche est relâchée
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        velocityX = 0;
    }
});

// Ajuster les variables pour limiter la vitesse de chute
const maxFallSpeed = 20; // Vitesse maximale de chute pour éviter de traverser les plateformes

// Fonction de détection de collision avec une plateforme améliorée
function checkCollision() {
    platforms.forEach(platform => {
        const platformRect = platform.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        // Collision avec le haut de la plateforme
        if (characterRect.bottom >= platformRect.top &&
            characterRect.bottom <= platformRect.top + Math.abs(velocityY) && // Tolérance dépendante de la vitesse
            characterRect.right > platformRect.left &&
            characterRect.left < platformRect.right &&
            velocityY >= 0) { // Vérifier si le personnage descend

            velocityY = 0; // Arrêter la vitesse verticale
            posY = platformRect.top - characterRect.height; // Replacer le personnage sur la plateforme
            isJumping = false;
        }

        // Collision avec le bas de la plateforme
        if (characterRect.top <= platformRect.bottom &&
            characterRect.top >= platformRect.bottom - Math.abs(velocityY) && // Tolérance dépendante de la vitesse
            characterRect.right > platformRect.left &&
            characterRect.left < platformRect.right &&
            velocityY < 0) { // Vérifier si le personnage monte

            velocityY = gravity; // Forcer le personnage à retomber
        }
    });
}

// Appliquer la gravité en limitant la vitesse de chute
function applyGravity() {
    velocityY += gravity;

    // Limiter la vitesse de chute
    if (velocityY > maxFallSpeed) {
        velocityY = maxFallSpeed;
    }
}

// Boucle de jeu pour mettre à jour la position du personnage
function gameLoop() {
    // Appliquer la gravité
    applyGravity();

    // Mettre à jour la position
    posX += velocityX;
    posY += velocityY;

    // Limites de la fenêtre (rebords)
    if (posX < 0) posX = 0;
    if (posX > window.innerWidth - character.offsetWidth) posX = window.innerWidth - character.offsetWidth;

    // Empêcher le personnage de traverser le bas de l'écran
    if (posY > window.innerHeight - character.offsetHeight) {
        posY = window.innerHeight - character.offsetHeight;
        velocityY = 0;
        isJumping = false;
    }

    // Appliquer la position
    character.style.left = posX + 'px';
    character.style.top = posY + 'px';

    // Vérifier les collisions
    checkCollision();

    // Demander une nouvelle frame d'animation
    requestAnimationFrame(gameLoop);
}

// Démarrer la boucle de jeu
gameLoop();
