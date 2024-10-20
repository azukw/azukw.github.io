window.addEventListener('load', () => {

    const workSection = document.getElementById('main-content');

    setTimeout(() => {
        workSection.style.transform = 'translateY(0)';
        workSection.style.opacity = '1';
    }, 200);  
});