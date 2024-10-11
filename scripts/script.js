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

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const scene = document.getElementById('scene');
    const longText = `Your long string of text goes here...
    alsikduhfpioaushfkjashfkjawsehfkjahsefasef
    asefaf
    asdf
    aef aesfdasef asefasfasefa asf asef ase fasef 
    saef as
    ef asef asef saefasefasefasefagsdfhfsghfghfsghfg hdfgh fdgh dh 
    dh dfgh dfghthsrgrgargfsdrg`;

    const layers = [0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.8, 0.9];
    const textBlocks = breakTextIntoBlocks(longText);

    layers.forEach(layer => {
        const layerElement = document.createElement('li');
        layerElement.classList.add('layer');
        layerElement.setAttribute('data-depth', layer);

        textBlocks.forEach(block => {
            const textBlock = document.createElement('div');
            textBlock.classList.add('text-block');
            textBlock.textContent = block;
            setRandomStyles(textBlock, layer);
            layerElement.appendChild(textBlock);
        });

        scene.appendChild(layerElement);
    });

    var parallaxInstance = new Parallax(scene, {
        relativeInput: true,
        hoverOnly: true,
        scalarX: 7,
        scalarY: 3
        // TODO: Hone in the settings here
    });
});

function breakTextIntoBlocks(text) {
    const words = text.split(' ');
    const blocks = [];
    let block = '';

    words.forEach(word => {
        if (block.length + word.length < 50) {
            block += word + ' ';
        } else {
            blocks.push(block.trim());
            block = word + ' ';
        }
    });

    if (block.length > 0) {
        blocks.push(block.trim());
    }

    return blocks;
}

function setRandomStyles(element, layer) {
    const size = 0.5 + layer * 1.5; // Scale size based on layer
    const opacity = layer; // Opacity based on layer
    const verticalPosition = Math.random() * 100; // Random vertical position between 0% and 100%
    const animationDuration = 5 + (1 - layer) * 10; // Faster scrolling for closer layers
    const animationDelay = Math.random() * 5; // Random animation delay between 0 and 5 seconds

    element.style.fontSize = `${size}rem`;
    element.style.top = `${verticalPosition}vh`; // Set random vertical position
    element.style.opacity = opacity;
    element.style.animation = `move ${animationDuration}s linear infinite`;
    element.style.animationDelay = `${animationDelay}s`; // Set random animation delay
}










// Modal stuff

// Modal structure
const projectData = {
    'project-1': {
        title: 'STM32 MIDI Sample Player',
        description: 'Description for Project 1.',
        images: [
            'path/to/image1.jpg',
            'path/to/image2.jpg',
            'path/to/image3.jpg'
        ]
    },
    'project-2': {
        title: 'Plantware Firmware',
        description: 'Description for Project 2.',
        images: [
            'path/to/image4.jpg',
            'path/to/image5.jpg',
            'path/to/image6.jpg'
        ]
    },
    'project-3': {
        title: 'Othello / Reversi Game',
        description: 'Description for Project 3.',
        images: [
            './assets/project-3/reversi-gameboard.png',
            './assets/project-3/reversi-login.png',
            './assets/project-3/reversi-menu.png'
        ]
    }
};





document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.close-btn');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const project = btn.getAttribute('data-project');
            console.log(project);
            openModal(project);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function openModal(project) {
        // Load project content dynamically (example content here)
        const modalBody = modal.querySelector('.modal-body');
        const projectInfo = projectData[project];

        if (projectInfo) {
            modalBody.innerHTML = `
                <div class="image-slider-container">
                    <button class="prev">&#10094;</button>
                    <div class="image-slider">
                        ${projectInfo.images.map((img, index) => `<div><img src="${img}" alt=""></div>`).join('')}
                    </div>
                    <button class="next">&#10095;</button>
                </div>
                <h2>${projectInfo.title}</h2>
                <p>${projectInfo.description}</p>
            `;
            initializeSlider(modalBody.querySelector('.image-slider-container'));
        } else {
            modalBody.innerHTML = `
                <h2>Project Not Found</h2>
                <p>The details for this project are not available.</p>
            `;
        }

        modal.style.display = 'flex'; // Ensure the modal is displayed
        setTimeout(() => {
            modal.classList.add('show');
            modalContent.style.transform = 'translateY(0)';
            modalContent.style.opacity = '1';
        }, 10); // Slight delay to trigger transition
    }

    function closeModal() {
        modalContent.style.transform = 'translateY(-50px)';
        modalContent.style.opacity = '0';
        // setTimeout(() => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none'; // Hide the modal after transition
            }, 300); // Match the transition duration
        // }, 300); // Match the transition duration
    }

    function initializeSlider(container) {
        let currentIndex = 0;
        const slider = container.querySelector('.image-slider');
        const images = slider.querySelectorAll('img');
        const prevButton = container.querySelector('.prev');
        const nextButton = container.querySelector('.next');

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.remove('active');
                if (i === index) {
                    img.classList.add('active');
                }
            });
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
        });

        // Show the first image initially
        showImage(currentIndex);
    }
});