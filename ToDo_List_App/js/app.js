// ToDo List App

/*
 *  Tasks to do by your self
 *
 *  [1] Use sweet alert if input is empty. 
 *  [2] Check if task is exists.
 *  [3] Create delete all button.
 *  [4] Create finish all tasks button.
 *  [5] Add tasks to the local storage.
 * 
*/

// Setting up variables

let theInput        = document.querySelector('.add-task input');
let theAddButton    = document.querySelector('.add-task .plus');
let taskContainer   = document.querySelector('.task-content');
let tasksCount      = document.querySelector('.task-count span');
let tasksCompleted  = document.querySelector('.tasks-completed span');


// Focus on input filed
window.onload = () => {
    theInput.focus();
};


// Check if input filed is empty
theAddButton.onclick = () => {

    if (theInput.value === '') {

        console.log('There is no value');
    
    } else {

        // Get no-tasks-message element
        let noTaskMsg = document.querySelector('.no-tasks-message');

        // Chech if span with no tasks message is exist
        if (document.body.contains(document.querySelector('.no-tasks-message'))) {

            // Remove no tasks message
            noTaskMsg.remove();
        }

        // Create main span 
        let mainSpan = document.createElement('span');

        // Create delete button 
        let deleteElement = document.createElement('span');

        // Create the main span text 
        let text = document.createTextNode(theInput.value);

        // Create the delete button text 
        let deleteText = document.createTextNode('Delete');

        // Add text to main span 
        mainSpan.appendChild(text);

        // Add class to main span
        mainSpan.className = 'task-box'; 

        // Add text to delete button
        deleteElement.appendChild(deleteText);

        // Add class to delete button
        deleteElement.className = 'delete';

        // Add delete button to main span
        mainSpan.appendChild(deleteElement);

        // Add the task to the container
        taskContainer.appendChild(mainSpan);

        // Empty the input value
        theInput.value = '';

        // Add focus on filed again
        theInput.focus();

        // Calculate tasks
        calculateTasks();

    }
};


document.addEventListener('click', (e) => {

    // Delete task
    if (e.target.className == 'delete') {

        // Remove current task
        e.target.parentNode.remove();

        // Check number of tasks inside the container
        if (taskContainer.childElementCount == 0) {

            createNoTasks();
        }
    }

    // Finish task
    if (e.target.classList.contains('task-box')) {

        // Toggle class 'finished'    
        e.target.classList.toggle('finished');
    }

    // Calculate tasks
    calculateTasks();

});

// Function to create no tasks message
function createNoTasks() {

    // Create message span element
    let msgSpan = document.createElement('span');

    // Create the text message 
    let msgText = document.createTextNode('No Tasks To Show');

    // Add text to message span element
    msgSpan.appendChild(msgText); 

    // Add class to message span 
    msgSpan.className = 'no-tasks-message';

   // Append to message span element to the task container
   taskContainer.appendChild(msgSpan);
    
}; 

// Function to calculate tasks 
function calculateTasks() {

    // Calculate all tasks
    tasksCount.innerHTML = document.querySelectorAll('.task-content .task-box').length;

    // Calculate all completed tasks
    tasksCompleted.innerHTML = document.querySelectorAll('.task-content .finished').length;

};