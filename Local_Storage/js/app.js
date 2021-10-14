// Local Storage

// Select elements

let allSpans    = document.querySelectorAll(".buttons span");
let results     = document.querySelector(".results > span");
let theInput    = document.getElementById("the-input");


// Loop in all spans 
allSpans.forEach(span => {

    span.addEventListener("click", (e) => {

        if (e.target.classList.contains("check-item")) {

            checkItem();
        }

        if (e.target.classList.contains("add-item")) {

            addItem();
        }

        if (e.target.classList.contains("delete-item")) {

            deleteItem();
        }

        if (e.target.classList.contains("show-item")) {

            showItem();
        }

    });

});


// check message input function
function checkMessageInput() {

    results.innerHTML = 'Input cannot be empty';
}


// check item function  
function checkItem() {
    
    if (theInput.value !== '') { 

        if (localStorage.getItem(theInput.value)) {

            results.innerHTML = `Found local storage item called <span>${theInput.value}</span>`;

        } else {

            results.innerHTML = `No local storage item with the name <span>${theInput.value}</span>`;
        }


    } else {

        checkMessageInput();
    }
    
}


// add item function 
function addItem() {

    if (theInput.value !== '') { 

        localStorage.setItem(theInput.value, "Test");

        results.innerHTML = `Local storage item <span>${theInput.value}</span> Added`;

        theInput.value = '';


    } else {

        checkMessageInput();
    }

}


// delete item function 
function deleteItem() {

    if (theInput.value !== '') { 

        if (localStorage.getItem(theInput.value)) {

            localStorage.removeItem(theInput.value);

            results.innerHTML = `local storage item <span>${theInput.value}</span> Deleted`;

            theInput.value = '';

        } else {

            results.innerHTML = `No local storage item with the name <span>${theInput.value}</span>`;
        }

    } else {

        checkMessageInput();
    }
    
}


// show item function 
function showItem() {

    if (localStorage.length) {

        results.innerHTML = '';

        for (let [key, value] of Object.entries(localStorage)) {

            results.innerHTML += `<span class="keys">${key}</span>`;
        }

    } else {

        results.innerHTML = 'Local Storage Is Empty';
    }

}


