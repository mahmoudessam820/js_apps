// Sliders 

// Get Slider items | user ES6 feature Array.from()
var sliderImages = Array.from(document.querySelectorAll('.slider-container img'));

// Get number of sliders
var slidesCount = sliderImages.length;

// Set current slide
var currentSlide = 1;

// Slide nubers element 
var slideNumbersElement = document.getElementById('slider-number');

// Pervious and next buttons
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');

// Handle click on previous and next buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

// Create the main UL element
var paginationElement = document.createElement('ul');

// Set ID to Ul element 
paginationElement.setAttribute('id', 'pagination-ul');

// Crate list items based on slides count
for (var i = 1; i <= slidesCount; i++) {

    // Create the li elements 
    var paginationItem = document.createElement('li');

    // Set custom Attribute
    paginationItem.setAttribute('data-index', i);

    // Set item content
    paginationItem.appendChild(document.createTextNode(i));

    // Append items to the main UL list
    paginationElement.appendChild(paginationItem);
}

// Add the created UL element to the page 
document.getElementById('indicators').appendChild(paginationElement);

// Get the new created UL
var paginationCreateUL = document.getElementById('pagination-ul');

// Get pagination items
var paginationsBullets = Array.from(document.querySelectorAll('#pagination-ul li'));

   

// Trigger the checker function  
theChecher();

// Next slide function
function nextSlide() {
    
    if (nextButton.classList.contains('disabled')) {
        // Do nothing 
        return false;
    } else {    
        currentSlide++;
        theChecher();
    }
}

// Previous slide function
function prevSlide() {

    if (prevButton.classList.contains('disabled')) {
        // Do nothing 
        return false;

    } else {    
        currentSlide--;
        theChecher();
    }
}

// Create the checher function 
function theChecher() {

    // Set the slide number 
    slideNumbersElement.textContent = `Slide # ${currentSlide} of ${slidesCount}`;

    // remove all active classes
    removeAllActiveClass();

    // Set active class on current slide 
    sliderImages[currentSlide - 1].classList.add('active');

    // Set active class on current pagination item
    paginationCreateUL.children[currentSlide - 1].classList.add('active');

    // Check if current slide is the first
    if (currentSlide == 1) {

        // Add disabled class on previous button 
        prevButton.classList.add('disabled');

    } else {

        // Remove disabled class on previous button 
        prevButton.classList.remove('disabled');
    }

    // Check if current slide is the first
    if (currentSlide == slidesCount) {

        // Add disabled class on previous button 
        nextButton.classList.add('disabled');

    } else {

        // Remove disabled class on previous button 
        nextButton.classList.remove('disabled');
    }
    
}

// Remove all active classes form images and pagination bullets

function removeAllActiveClass() {

    sliderImages.forEach((img) => {

        img.classList.remove('active');
    });

    paginationsBullets.forEach((bullet) => {

        bullet.classList.remove('active');
    }); 

}