// Hangman Game

// Create letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get array from lettres
let lettersArray = Array.from(letters);

// Select lettres container 
let lettersContainer = document.querySelector('.letters');

// Generate letters 
lettersArray.forEach(letter => {

    // Create span
    let span = document.createElement('span');

    // Create letter text node 
    let theLetter = document.createTextNode(letter);
    
    // Append the letter to span 
    span.appendChild(theLetter);

    // Add class on span
    span.className = 'letter-box';

    // Append span to the letters container
    lettersContainer.appendChild(span);

});

// Create object of words + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Menento", "Coco", "Up"],
    pepole: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palesine", "Yenen", "Egypt", "Bahrain", "Qatar"]
}

// Get random property
let allKeys = Object.keys(words);

// Random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category words
let randomPropValue = words[randomPropName];

// Random numbers depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The chosen word
let randomValueValue = randomPropValue[randomValueNumber];

// Set category info
document.querySelector('.game-info .category span').innerHTML = randomPropName;

// Select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

// Create spans depened on words
lettersAndSpace.forEach(letter => {

    // Create empty span
    let emptySpan = document.createElement("span");

    // Check if letter is space
    if (letter === ' ') {

        // Add class to the span 
        emptySpan.className = 'with-span';
    } 
    
    // Append span to the Guess Container
    lettersGuessContainer.appendChild(emptySpan);
    
});

// Select guess span 
let guessSpans =  document.querySelectorAll(".letters-guess span");

// Set wrong attempts
let wrongAttempts = 0;

// Selecte the draw element
let theDraw = document.querySelector(".hangman-draw");

// Hanle clicking on letters
document.addEventListener('click', (e) => {

    // Set the shose status
    let theStatus = false;

    if (e.target.className === 'letter-box') {

        e.target.classList.add('clicked');

        // Get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The chosen word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, wordIndex) => {

            // If the clicked letter equle to one of the chosen word letter
            if (theClickedLetter == wordLetter) {

                // Set status to true
                theStatus = true;

                // loop on all guess span
                guessSpans.forEach((span, spanIndex) => {

                    if (wordIndex === spanIndex) {

                        span.innerHTML = theClickedLetter;
                    }

                });

            }   

        });

        // outside loop

        // If letter is wrong
        if (theStatus !== true) {

            // Incresase the wrong attempts
            wrongAttempts++

            // Add class wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // Play fail sound
            document.getElementById("fail").play();

            // Check the count of wrong attempts
            if (wrongAttempts === 8) {

                endGame();

                lettersContainer.classList.add("finished");
            }

        } else {

            // Play success sound
            document.getElementById("success").play();
        }


    }

});

// Create end game function
function endGame() {

    // Creae popup div
    let div = document.createElement("div");

    // Create text to div 
    let divText = document.createTextNode(`Game Over, The Correct word is ${randomValueValue}`); 

    // Append text to the div 
    div.appendChild(divText);

    // Add class on div
    div.className = 'popup';

    // Append to the body
    document.body.appendChild(div);
}
