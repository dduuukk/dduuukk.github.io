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

toggleSwitch.addEventListener('click', () => {
    body.classList.toggle('dark');
});


// Scroll animation -------------------------------------------------------------
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: false
});

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

srRight = ScrollReveal({
    origin: 'right',
    distance: '80px',
    duration: 2000,
    reset: false
});

srRight.reveal('.skill', { delay: 100 });
srRight.reveal('.skill-box', { delay: 100 });
srRight.reveal('.contact-form', { delay: 100 });


// Active link -------------------------------------------------------------------
const sections = document.querySelectorAll('section[id]');
function scrollActiveLink() {
    const scrollY = window.scrollY;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActiveLink);
