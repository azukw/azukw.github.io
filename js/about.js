window.addEventListener('load', () => {
    const aboutSection = document.getElementById('about-section');
    
    // Add a slight delay to make sure the transition feels smooth
    setTimeout(() => {
        aboutSection.style.transform = 'translateY(0)';
    }, 200);  // 200ms delay for a smooth load-in
});
