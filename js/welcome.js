// Christian Bender

// Get the button element
var button = document.querySelector('.hamburger');

// Add a click event listener
button.addEventListener('click', function() {
  // Toggle the 'is-active' class
  this.classList.toggle('is-active');

  // Toggle the visibility of the menu
  var menu = document.getElementById('menu');
  menu.classList.toggle('show-menu');
  document.body.classList.toggle('blur');
});