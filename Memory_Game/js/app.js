// Memory Game

// Get the buttons 
document.querySelector(".control-buttons span").onclick = () => {

    let yourName = prompt("What is your name");

    // Chack if users input his name or not 
    if (yourName == null || yourName == "") {

        // If yourName or "" write the default name Unknown
        document.querySelector(".name span").innerText = 'Unknown';

    } else {
        // If users input his name write it in span element 
        document.querySelector(".name span").innerText = yourName;

    }
    // Remove the buttons element from the dom tree
    document.querySelector(".control-buttons").remove();
};

// Set the time of duration
let duration = 1000;

// Get all elements from the blocks container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Input all the elements in array 
let blocks = Array.from(blocksContainer.children);

/*
 * Get all index keys from the blocks
 * Here we will extract all index and use them in the new array as keys & values.
 * Like this index the new array => 0:0 <= index of blocks array.
 * Like this index the new array => 1:1 <= index of blocks array.
 * And with that you create range of keys
*/

let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

// Add order css property to game blocks
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    // Add click event
    block.addEventListener('click', () => {

        // Trigger the flip block function 
        flipBlock(block);
    }); 

});

// Flip block fuction 
function flipBlock(selectedBlock) {

    // Add class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect all flipped card
    let allFlippedBlock = blocks.filter((flippedBlock) => flippedBlock.classList.contains('is-flipped'));

    // Check if tow card is selected 
    if (allFlippedBlock.length === 2) {

        // Stop clicking function
        stopClicking();

        // Check metched block fuction
        checkMatchedBlocks(allFlippedBlock[0], allFlippedBlock[1]);
    }
}

// Stop clicking function
function stopClicking() {

    // Add class no clicking on main container
    blocksContainer.classList.add('no-clicking');

    // Remove class
    setTimeout(() => {

        // Remove class no clicking after the duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

// Check matched block 
function checkMatchedBlocks(firstBlock, secondBlock) {
    

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.memoryGame === secondBlock.dataset.memoryGame) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();
    }
}

function shuffle(array) {

    // Setting varaibles 
    let current = array.length,
        temporary,
        random;

    while (current > 0) {

        // Get range of random numbers
        random = Math.floor(Math.random() * current);

        // Decrease length by one
        current--;

        // [1] Save current element in stash
        temporary = array[current];

        // [2] Current element = Random element
        array[current] = array[random];

        // Random element = Get elemnet from stash
        array[random] = temporary;
    }
    return array;
}
