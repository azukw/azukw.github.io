document.addEventListener("DOMContentLoaded", function () {
    var pixelBackground = document.querySelector(".pixelBackground");

    // Fonction pour créer les blocs animés
    function createBlocks() {
        pixelBackground.innerHTML = ""; // Vide les anciens blocs pour éviter les doublons

        const { innerWidth, innerHeight } = window;
        const blockSize = Math.max(innerWidth * 0.08, 20); // Taille des blocs ajustée
        const columns = Math.ceil(innerWidth / blockSize); 
        const rows = Math.ceil(innerHeight / blockSize); 

        for (let i = 0; i < columns; i++) {
            const column = document.createElement("div");
            column.classList.add("column");
            column.style.width = `${100 / columns}vw`; // Ajuste la largeur pour couvrir l’écran

            for (let j = 0; j < rows; j++) {
                const block = document.createElement("div");
                block.classList.add("block");
                block.style.height = `${100 / rows}vh`; // Ajuste la hauteur pour couvrir l’écran
                column.appendChild(block);
            }

            pixelBackground.appendChild(column);
        }
    }

    // Animation d'apparition des blocs (arrivée)
    function animateEntry() {
        gsap.set(".block", { opacity: 1 }); // Rendre les blocs visibles
        gsap.to(".block", {
            opacity: 0,
            duration: 0.1,
            stagger: { amount: 0.3, from: "random" },
            onComplete: () => {
                pixelBackground.style.display = "none";
            }
        });
    }

    function animateExit(destination) {
        pixelBackground.style.display = "flex"; // Afficher directement les blocs
        createBlocks(); // Générer les blocs immédiatement AVANT animation
    
        gsap.fromTo(".block", 
            { opacity: 0 }, // Commencer invisible
            { 
                opacity: 1,
                duration: 0.3,
                stagger: { amount: 0.3, from: "random" },
                onComplete: () => {
                    window.location.href = destination;
                }
            }
        );
    }
    

    // ** Vérifier si on vient d'une transition **
    if (sessionStorage.getItem("transition") === "true") {
        sessionStorage.removeItem("transition");
        pixelBackground.style.display = "flex";
        createBlocks();
        animateEntry(); // Lancer l’animation d’arrivée
    } else {
        pixelBackground.style.display = "none";
    }

    // ** Gérer le clic sur un lien **
    document.addEventListener("click", function (e) {
        const link = e.target.closest("a");
        if (link && link.hostname === window.location.hostname && link.target !== "_blank" && !link.href.includes("#")) {
            e.preventDefault();
            sessionStorage.setItem("transition", "true");
            animateExit(link.href);
        }
    });

});
