window.addEventListener('load', () => {

    const workSection = document.getElementById('work-section');

    setTimeout(() => {
        workSection.style.transform = 'translateY(0)';
        workSection.style.opacity = '1';
    }, 200);  
});

document.addEventListener("DOMContentLoaded", function() {
    const projects = document.querySelectorAll('.project');
    const hoverImage = document.getElementById('project-image');
    const hoverImageContainer = document.getElementById('hover-image');
    const description = document.getElementById('description');
    const title = document.getElementById('title');

    let hoverTimeout; 

    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            const imageSrc = this.getAttribute('data-image');

            clearTimeout(hoverTimeout);

            hoverTimeout = setTimeout(() => {
                hoverImage.src = imageSrc; 
                hoverImage.style.opacity = '1'; 
                hoverImageContainer.style.height = '500px'; 
                description.style.transform = 'translateY(-0px)'; 
                title.style.transform = 'translateY(-0px)'; 
            }, 200); 
        });

        project.addEventListener('mouseleave', function() {

            clearTimeout(hoverTimeout);

            hoverTimeout = setTimeout(() => {
                hoverImage.style.opacity = '0'; 
                hoverImage.src = 'imgs/cube.png'; 
                hoverImageContainer.style.height = '0'; 
                description.style.transform = 'translateY(0)'; 
                title.style.transform = 'translateY(0)'; 
            }, 200); 
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let resetTimeout; 

    function isSmallOrLargeScreen() {
        return window.innerWidth < 1200 || window.innerWidth > 2200;
    }

    const projects = document.querySelectorAll('.project');

    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');
    const hoverImage = document.getElementById('project-image'); 

    const defaultTitle = 'PROJETS';
    const defaultDescription = 'Ces projets ont été pour la plupart réalisés pendant ma Licence Informatique à Rennes. Pendant ces trois années, j\'ai pu acquérir de l\'expérience en programmation, ce qui me permet de toujours améliorer mes projets.';

    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            if (!isSmallOrLargeScreen()) {

                clearTimeout(resetTimeout);

                const newTitle = project.getAttribute('data-title');
                const newDescription = project.getAttribute('data-description');
                const newImage = project.getAttribute('data-image');

                titleElement.textContent = newTitle;
                descriptionElement.textContent = newDescription;

                hoverImage.src = newImage;
                hoverImage.style.opacity = '1';
            }
        });

        project.addEventListener('mouseleave', () => {
            if (!isSmallOrLargeScreen()) {

                resetTimeout = setTimeout(() => {
                    titleElement.textContent = defaultTitle; 
                    descriptionElement.textContent = defaultDescription; 
                    hoverImage.style.opacity = '0'; 
                }, 500); 
            }
        });
    });
});