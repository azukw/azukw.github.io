window.addEventListener('load', () => {
    // Get the work section container
    const workSection = document.getElementById('work-section');

    // Add a slight delay to make sure the transition feels smooth
    setTimeout(() => {
        workSection.style.transform = 'translateY(0)';
        workSection.style.opacity = '1';
    }, 200);  // 200ms delay for a smooth load-in
});

document.addEventListener("DOMContentLoaded", function() {
    const projects = document.querySelectorAll('.project');
    const hoverImage = document.getElementById('project-image');
    const hoverImageContainer = document.getElementById('hover-image');
    const description = document.getElementById('description');
    const title = document.getElementById('title');

    let hoverTimeout; // Variable pour gérer le délai

    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            const imageSrc = this.getAttribute('data-image');

            // Effacer l'image précédente en annulant tout timeout
            clearTimeout(hoverTimeout);

            // Ajouter un délai avant de changer l'image pour une transition plus fluide
            hoverTimeout = setTimeout(() => {
                hoverImage.src = imageSrc; // Mettre à jour la source de l'image
                hoverImage.style.opacity = '1'; // Afficher l'image
                hoverImageContainer.style.height = '500px'; // Ajuster la hauteur du conteneur d'image
                description.style.transform = 'translateY(-0px)'; // Lever le paragraphe
                title.style.transform = 'translateY(-0px)'; // Lever aussi le titre
            }, 200); // Délai de 200ms pour rendre la transition plus douce
        });

        project.addEventListener('mouseleave', function() {
            // Nettoyer l'ancien timeout
            clearTimeout(hoverTimeout);

            // Réinitialiser après un délai pour éviter les changements brusques
            hoverTimeout = setTimeout(() => {
                hoverImage.style.opacity = '0'; // Cacher l'image en douceur
                hoverImage.src = 'imgs/cube.png'; // Réinitialiser la source de l'image
                hoverImageContainer.style.height = '0'; // Remettre la hauteur du conteneur à 0
                description.style.transform = 'translateY(0)'; // Réinitialiser la position du paragraphe
                title.style.transform = 'translateY(0)'; // Réinitialiser la position du titre
            }, 200); // Laisser un délai pour cacher l'image doucement
        });
    });
});

// Sélectionner tous les éléments de projet
const projects = document.querySelectorAll('.project');

// Sélectionner les éléments de la description
const titleElement = document.getElementById('title');
const descriptionElement = document.getElementById('description');
const projectImage = document.getElementById('project-image');

// Parcourir chaque projet
projects.forEach(project => {
    // Ajouter un écouteur d'événements pour le survol (hover)
    project.addEventListener('mouseenter', () => {
        // Récupérer les données de l'attribut 'data-*' de chaque projet
        const newTitle = project.getAttribute('data-title');
        const newDescription = project.getAttribute('data-description');
        const newImage = project.getAttribute('data-image');
        
        // Mettre à jour le contenu de la section description
        titleElement.textContent = newTitle;
        descriptionElement.textContent = newDescription;
        projectImage.src = newImage;
        projectImage.style.opacity = '1';  // Rendre l'image visible
    });

    // Optionnel: Revenir au contenu par défaut lorsqu'on quitte le survol
    project.addEventListener('mouseleave', () => {
        titleElement.textContent = 'PROJETS';
        descriptionElement.textContent = 'Ces projets ont été pour la plupart réalisés pendant ma Licence Informatique à Rennes. Pendant ces trois années, j\'ai pu acquérir de l\'expérience en programmation, ce qui me permet de toujours améliorer mes projets.';
        projectImage.style.opacity = '0';  // Cacher l'image
    });
});
