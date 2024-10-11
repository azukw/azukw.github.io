window.addEventListener('load', () => {
    // Get the work section container
    const workSection = document.getElementById('main-content');

    // Add a slight delay to make sure the transition feels smooth
    setTimeout(() => {
        workSection.style.transform = 'translateY(0)';
        workSection.style.opacity = '1';
    }, 200);  // 200ms delay for a smooth load-in
});
