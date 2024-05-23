// Christian Bender
// Created based on https://www.codepel.com/animation/javascript-text-scramble-effect/

/**
 * Text scrambler class that animates the text content of an element.
 */
class TextScrambleShort {
    
    constructor(el) {
        this.el = el; // Element to display the text
        this.chars = "!<>-_\\/[]{}—=+*^?#________0123456789"; // Scramble character set
        this.update = this.update.bind(this);
    }

    /**
     * Sets the text content of an element with animation.
     *
     * @param {string} newText - The new text to be set.
     * @returns {Promise} - A promise that resolves when the animation is complete.
     */
    setText(newText) {
        const oldText = this.el.innerText;
        // Get the maximum length of the old and new text to prevent the animation from stopping prematurely
        const length = Math.max(oldText.length, newText.length);
        // Define promise to resolve when animation is complete
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            // Store old character or empty string if character doesn't exist
            const from = oldText[i] || '';
            // Store new character or empty string if character doesn't exist
            const to = newText[i] || '';
            // Generate a random start and end frame for each character
            const start = Math.floor(Math.random() * 35);
            const end = start + Math.floor(Math.random() * 35);
            this.queue.push({ from, to, start, end });
        }
        // Cancel the previous frame request to prevent overlapping animations
        cancelAnimationFrame(this.frameRequest);
        // Set the frame to 0 to start the animation at the first character
        this.frame = 0;
        // Start the animation
        this.update();
        return promise;
    }

    /**
     * Updates the animation frame and renders the characters accordingly.
     * If all characters have reached their final state, resolves the promise.
     */
    update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            // Check if the character has reached its final state
            // If it has, set the character to the final state and increment the complete counter
            if (this.frame >= end) {
                complete++;
                output += to;
            // If the character is between the start and end frame, set it to a random character
            } else if (this.frame >= start) {
                // If the character is not set, set it to a random character
                // 28% chance of character change on each loop
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            // Character is before the start frame, set it to the initial state
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        // Check if all characters have reached their final state
        if (complete === this.queue.length) {
            // Resolve the promise if all characters have reached their final state
            this.resolve();
        } else {
            // Increment the frame and request the next update animation cycle
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    /**
     * Returns a random character from the character set.
     *
     * @returns {string} - A random character from the character set.
     */
    randomChar() {
        // Return a random character from the character set
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Define the texts for the menu items
const menuTexts = ['about me', 'projects', 'contact'];

const buttonsc = document.querySelector('.hamburger');

let isMenuOpen = false; // Flag to track menu state

buttonsc.addEventListener('click', () => {
  // Get all text elements
  const textElements = document.querySelectorAll('.scrambler-menu');

  // Toggle the menu state
  isMenuOpen = !isMenuOpen;

  // Apply the text scrambler effect to each text element
  textElements.forEach((textElement, index) => {
    const fx = new TextScrambleShort(textElement);
    fx.setText(isMenuOpen ? menuTexts[index] : "");
    // Set the data-text attribute to the new text
    textElement.setAttribute('data-text', isMenuOpen ? menuTexts[index] : "");
  });
});