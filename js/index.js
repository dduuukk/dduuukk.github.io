// const scrambler = document.getElementById('scrambler');
// const text = 'cvsb.com';
// let index = 0;

// function randomChar() {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     return chars[Math.floor(Math.random() * chars.length)];
// }

// function scramble() {
//     let scramble = '';
//     for (let i = 0; i < text.length; i++) {
//         scramble += i < index ? text[i] : randomChar();
//     }
//     scrambler.textContent = scramble;
// }

// function type() {
//     if (index < text.length) {
//         scrambler.textContent = scrambler.textContent.substring(0, index) + text[index] + scrambler.textContent.substring(index + 1);
//         index++;
//     } else {
//         clearInterval(typeInterval); // Clear the interval when all letters are set
//     }
// }

// typeInterval = setInterval(type, 300); // This controls the delay before the current index is set to the desired letter
// setInterval(scramble, 50);
// type();


// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
        this.el = el; // Element to display the text
        this.chars = "!<>-_\\/[]{}—=+*^?#________0123456789";
        this.update = this.update.bind(this);
    }
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
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 45);
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
                if (!char || Math.random() < 0.38) {
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
    randomChar() {
        // Return a random character from the character set
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const el = document.querySelector(".scrambler");
const fx = new TextScramble(el);
fx.setText("cvsb.com");