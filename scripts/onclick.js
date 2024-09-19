// ---- FEATURED SECTION ----------------------------------
// Button and icon onClick event handles

// Download resume button onClick
function downloadResume() {
    // TODO: Add resume to backend ideally, but frontend in the meantime
    window.open('assets/files/Christian Bender Resume.pdf', '_blank');

}

// Contact button onClick
function goToContact() {
    console.log('goToContact');
    const contactSection = document.getElementById('contact');

    window.scrollTo({
        top: contactSection.offsetTop
    });
}


// GitHub icon onClick
function openGitHub() {
    window.open('https://github.com/dduuukk', '_blank');
}

// LinkedIn icon onClick
function openLinkedIn() {
    window.open('https://www.linkedin.com/in/chrisvsbender/', '_blank');
}


// ---- ABOUT SECTION ----------------------------------
