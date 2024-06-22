// Christian Bender

document.querySelector('.btn-custom').addEventListener('click', function() {
    // print a message to the console
    // console.log('Button clicked!');
    var overlay = document.querySelector('.button-overlay');
    overlay.classList.add('show');

        // Remove the 'show' class after a delay
        setTimeout(function() {
            overlay.classList.remove('show');
        }, 1000);  // Change this to the desired duration

        // Redirect to welcome.html after 1 second
        setTimeout(function() {
            window.location.href = "../lib/welcome.html";
            // overlay.classList.remove('show');
        }, 700);
});

