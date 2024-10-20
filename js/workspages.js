window.addEventListener("scroll", () => {
    const contentSection = document.querySelector(".content-section");
    const scrollPosition = window.scrollY;

    if (scrollPosition > contentSection.offsetTop - window.innerHeight / 1.5) {
        contentSection.style.opacity = "1";
        contentSection.style.transform = "translateY(0)";
    }
});

document.querySelector(".content-section").style.opacity = "0";
document.querySelector(".content-section").style.transform = "translateY(50px)";