function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");

    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
    } else {
        menuBtn.className = "nav-menu";
    }
}


// Dark mode ---------------------------------------------------------------------
const body = document.querySelector('body'),
    toggleSwitch = document.getElementById('toggle-switch');

// Function to enable dark mode
function enableDarkMode() {
    body.classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
}

// Function to disable dark mode
function disableDarkMode() {
    body.classList.remove('dark');
    localStorage.setItem('darkMode', 'disabled');
}

// Check for saved user preference, if any, on page load
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        enableDarkMode();
    } else if (darkMode === 'disabled') {
        disableDarkMode();
    } else {
        // Check for system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
});

toggleSwitch.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});


// Scroll animation -------------------------------------------------------------
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: false
});

sr.reveal('.header', { duration: 800 })
sr.reveal('.featured-fx-text', { delay: 100 });
sr.reveal('.info-text', { delay: 200 });
sr.reveal('.text-btn', { delay: 200 });
sr.reveal('.social-icons', { delay: 200 });
sr.reveal('.featured-image', { delay: 320 });

sr.reveal('.project-box', { interval: 200 });

sr.reveal('.top-header', {  });

const srLeft = ScrollReveal({
    origin: 'left',
    distance: '80px',
    duration: 2000,
    reset: false
});

srLeft.reveal('.about-info', { delay: 100 });
srLeft.reveal('.contact-info', { delay: 100 });

const srRight = ScrollReveal({
    origin: 'right',
    distance: '80px',
    duration: 2000,
    reset: false
});

srRight.reveal('.skill', { delay: 100 });
// srRight.reveal('.skill-box', { delay: 100 });
srRight.reveal('.contact-form', { delay: 100 });


// Active link -------------------------------------------------------------------
// Active link -------------------------------------------------------------------
const sections = document.querySelectorAll('section[id]');
const navbarHeight = document.querySelector('header').offsetHeight;

function scrollActiveLink() {
    const scrollY = window.scrollY;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - navbarHeight; // Adjust for navbar height
        const sectionId = current.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActiveLink);

// Intersection Observer for #about section
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('#about');
    const skillPercents = document.querySelectorAll('.skill-box .skill-percent');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillPercents.forEach(skillPercent => {
                    skillPercent.classList.add('animate-skill');
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(aboutSection);
});




document.addEventListener('DOMContentLoaded', () => {
    const navbarHeight = document.querySelector('header').offsetHeight;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            let targetPosition;
            if (targetId === 'home') {
                targetPosition = 0; // Scroll to the top for the home section
            } else {
                targetPosition = targetElement.offsetTop - navbarHeight;
            }

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
});

// Home animation

// main.js
document.addEventListener('DOMContentLoaded', () => {
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene, {
        relativeInput: true
    });
});