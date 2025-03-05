gsap.registerPlugin(Draggable);

window.onload = function () {
    const timeline = document.querySelector('.timeline');
    const scroller = document.querySelector('.scroller');
    const container = document.querySelector('.container');
    const images = document.querySelectorAll('.container .img'); // Sélectionne les images dans .container
    const gap = parseInt(window.getComputedStyle(document.body).fontSize);
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;
    let maxDragX;
    let isMouseOverImage = false;


    container.addEventListener("mouseenter", () => {
        isMouseOverImage = true;
    });
    
    container.addEventListener("mouseleave", () => {
        isMouseOverImage = false;
    });

    // Fonction pour recalculer les valeurs nécessaires
    function recalculateValues() {
        const imageWidth = images[0].offsetWidth + gap + 20; // Largeur d'une image + marge
        maxDragX = Math.max(0, images.length * imageWidth - window.innerWidth + 2 * gap);
        updateContainerPosition(gsap.getProperty(scroller, "x"));
    }

    // Calcul initial des valeurs
    recalculateValues();

    // Désactive le drag & drop natif des images
    images.forEach(img => {
        img.addEventListener("dragstart", (e) => e.preventDefault());
    });

    function updateContainerPosition(scrollerX) {
        let progress = scrollerX / maxDragX;
        let containerX = -progress * ((images.length * (images[0].offsetWidth + gap + 20) - window.innerWidth) / 1);
        gsap.to(container, {
            x: containerX,
            duration: 0.6,
            ease: "power3.out",
        });
    }

    // Scroll avec la molette
    window.addEventListener("wheel", function (event) {
        if (!isMouseOverImage) return; // Ne pas autoriser le défilement si la souris n'est pas sur l'image
        event.preventDefault();
        let delta = event.deltaY;
        let newX = gsap.getProperty(scroller, "x") + delta;
        newX = Math.max(0, Math.min(newX, maxDragX));
    
        gsap.to(scroller, { x: newX, duration: 0.01, ease: "power3.out" });
        updateContainerPosition(newX);
    }, { passive: false });

    // Drag avec la souris
    container.addEventListener("mousedown", (e) => {
        if (!isMouseOverImage) return; // Si la souris n'est pas sur l'image, ne commence pas le drag
        e.preventDefault();
        isDown = true;
        isDragging = false;
        startX = e.pageX;
        scrollLeft = gsap.getProperty(scroller, "x");
        container.style.cursor = "grabbing";
    });

    container.addEventListener("mouseup", () => {
        isDown = false;
        setTimeout(() => isDragging = false, 50);
        container.style.cursor = "default";
    });

    container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        isDragging = true;

        const moveX = e.pageX - startX;
        let newX = Math.max(0, Math.min(scrollLeft - moveX, maxDragX));

        gsap.to(scroller, { x: newX, duration: 0.5, ease: "power3.out" });
        updateContainerPosition(newX);
    });

    // Empêche le faux clic après un glissement
    container.addEventListener("click", (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Recalculer les valeurs lors du redimensionnement de la fenêtre
    window.addEventListener("resize", recalculateValues);

    // Drag avec le tactile
    container.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Bloque le scroll de la page
        isDown = true;
        isDragging = false;
        startX = e.touches[0].pageX;
        scrollLeft = gsap.getProperty(scroller, "x");
    }, { passive: false });
    
    
    container.addEventListener("touchend", () => {
        isDown = false;
        setTimeout(() => isDragging = false, 50);
    });

    container.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        e.preventDefault(); // Empêche le scroll vertical de la page
        isDragging = true;
    
        const moveX = e.touches[0].pageX - startX;
        let newX = Math.max(0, Math.min(scrollLeft - moveX, maxDragX));
    
        gsap.to(scroller, { x: newX, duration: 0.5, ease: "power3.out" });
        updateContainerPosition(newX);
    }, { passive: false });
};

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".img").forEach(img => {
        const title = img.getAttribute("data-title");
        const number = img.getAttribute("data-number");
        const tech = img.getAttribute("data-tech");
        const year = img.getAttribute("data-year");

        img.querySelector(".project-number").textContent = `// ${number}`;
        img.querySelector(".project-title").textContent = title;
        img.querySelector(".project-tech").textContent = `${tech} - ${year}`;

        // Force l'affichage des informations du projet
        const projectInfo = img.querySelector(".project-info");
        projectInfo.style.opacity = '1';
        projectInfo.style.display = 'block';
    });
});
