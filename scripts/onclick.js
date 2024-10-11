// ---- FEATURED SECTION ----------------------------------
// Button and icon onClick event handles

// Download resume button onClick
// function downloadResume() {
//     // TODO: Add resume to backend ideally, but frontend in the meantime
//     window.open('assets/files/Christian Bender Resume.pdf', '_blank');
// }

function fillResumeRequest() {
    const subjectField = document.getElementById('subject-form');
    const messageField = document.getElementById('message-content');

    // Check if the fields are already filled with the content
    if (subjectField.value !== 'Resume Request' ) {
        // Clear field
        subjectField.value = '';

        // Delay the fill animation
        setTimeout(() => {
            // Animate the text content
            animateText(subjectField, 'Resume Request');
        }, 500);
    }
    
    if (messageField.value !== 'Hi, I would like to request a copy of your resume.') {
        // Clear field
        messageField.value = '';

        // Delay the fill animation
        setTimeout(() => {
            // Animate the text content
            animateText(messageField, 'Hi, I would like to request a copy of your resume.');
        }, 650);
    }

    goToContact();

}

function animateText(element, text) {
    let index = 0;
    const interval = setInterval(() => {
        element.value += text[index];
        index++;
        if (index === text.length) {
            clearInterval(interval);
        }
    }, 10); // Adjust the speed as needed
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