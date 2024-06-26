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

var navbar = document.querySelector('.navbar');
var navbarHeight = navbar.offsetHeight;

var navbar = document.querySelector('.navbar');
var navbarHeight = navbar.offsetHeight;

var title = document.querySelector('.animated-title');
title.style.top = `calc(50% - ${navbarHeight}px)`;

var subtitle = document.querySelector('.animated-subtitle');
subtitle.style.top = `calc(50% - ${navbarHeight}px)`;

var line = document.querySelector('.line');
line.style.top = `calc(50% - ${navbarHeight}px)`;