// Quiz App

// Select elements
const counSpan              = document.querySelector(".count span");
const bullets               = document.querySelector(".bullets");
const bulletsSpanContainer  = document.querySelector(".bullets .span-container");
const quizArea              = document.querySelector(".quiz-area");
const answerArea            = document.querySelector(".answer-area");
const submiteButton         = document.querySelector(".submit-button"); 
const resultsContainer      = document.querySelector(".results");
const countDownElement      = document.querySelector(".countdown");

// Set options
let currentIndex  = 0;
let rightAnswers  = 0;
let countDownInterval; 

// Get all questions 
function getQuestions() {

    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function(){

        if (this.readyState === 4 && this.status === 200) {

            // convart json object to js object
            let questionsObject = JSON.parse(this.responseText);

            // Get count of questions 
            let qCount = questionsObject.length;

            // Create bullets + set questions count
            createBullets(qCount);

            // Add question data 
            addQuestionData(questionsObject[currentIndex], qCount);

            // Start count down
            countDown(5, qCount);

            // Click on submit button
            submiteButton.onclick = () => {

                // Get the right answer
                let theRightAnswer = questionsObject[currentIndex].right_answer;

                // Increase the index
                currentIndex++;
                
                // Create function to check the right answers
                checkAnswer(theRightAnswer, qCount);

                // Remove the previous question
                quizArea.innerHTML = "";
                answerArea.innerHTML = "";

                // Add question data again
                addQuestionData(questionsObject[currentIndex], qCount);

                // Handil bullets class
                handilBullets();

                // Start count down
                clearInterval(countDownInterval);
                countDown(3, qCount);

                // Show results
                showResults(qCount); 
            };
        }
    };

    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();
};

getQuestions(); 

// Create bullets depand on questions
function createBullets(num) {

    counSpan.innerHTML = num;

    // Create spans
    for (let i = 0; i < num; i++) {

        // create spans 
        let theBullet = document.createElement("span");

        // Check if its first span
        if (i === 0) {

            theBullet.className = "on";
        }

        // Append bullets to main bullet container
        bulletsSpanContainer.appendChild(theBullet);
    }
}; 

function addQuestionData(obj, count) {

    if (currentIndex < count) {

        // Create H2 question title 
        let questionTitle = document.createElement("h2");
        
        // Create question text
        let questionText = document.createTextNode(obj.title);

        // Append text to H2
        questionTitle.appendChild(questionText);

        // Append H2 to th quiz area
        quizArea.appendChild(questionTitle);

        // Create the answer div
        for (let i = 1; i <= 4; i++) {

            // Create main answer div
            let mainDiv = document.createElement("div");

            // Add class to main div
            mainDiv.className = 'answer';

            // Create readio input
            let radioInput = document.createElement("input");

            // Add type + name + id + data-attribute
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id= `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];
            
            // Make first option selected
            if (i === 1) {

                radioInput.checked = true;
            } 

            // Create label 
            let theLabel = document.createElement("label");

            // Add for attrbute to label
            theLabel.htmlFor = `answer_${i}`;

            // Create text to the label
            let theLabelText = document.createTextNode(obj[`answer_${i}`]);

            // Add the text to label
            theLabel.appendChild(theLabelText);

            // Add input + label to the main div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);

            // Add all divs to the answrs area
            answerArea.appendChild(mainDiv);

        }
    }

};

// Create function to check the right answers
function checkAnswer(rAnswer, count) {

    // Get radio input by name 
    let answers = document.getElementsByName("question");

    // Get the choosen answer
    let theChoosenAnswer;

    // Make loop on all radio input by its name
    for (let i = 0; i < answers.length; i++) {

        // Ckeck what the radio is checked 
        if (answers[i].checked) {

            // Get the answers from dataset => data-answer="To Make Text Bold"
            theChoosenAnswer = answers[i].dataset.answer;      
        }
    }

    // Check if the right answer equle to choosen answers
    if (rAnswer === theChoosenAnswer) {

        // If rAnswer is right increase the rightAnswer araible
        rightAnswers++
    }

};

// function to add class on all bullets
function handilBullets() {

    // Get all bullets 
    let bulletsSpans = document.querySelectorAll(".bullets .span-container span");

    // Make array from bullets 
    let arraySpans = Array.from(bulletsSpans);

    arraySpans.forEach((span, index) => {

        if (currentIndex === index) {

            // Add class [on] in all spans
            span.className = "on";
        }
    });
}; 


// Function show the results after the questions is finished
function showResults(count) {

     let theResults;

    if (currentIndex === count) {
        
        quizArea.remove();
        answerArea.remove();
        submiteButton.remove();
        bullets.remove();

        if (rightAnswers > count / 2 && rightAnswers < count) {

            theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;

        } else if (rightAnswers === count) {

            theResults = `<span class="perfect">Perfect</span>, All answers is good`;

        } else {

            theResults = `<span class="bad">bad</span>, ${rightAnswers} From ${count} is bad.`;
        }

        resultsContainer.innerHTML = theResults;
        resultsContainer.style.padding = '10px';
        resultsContainer.style.backgroundColor = 'white';
        resultsContainer.style.marginTop = '10px';
    }
};

// count down interval function
function countDown(duration, count) {

    if (currentIndex < count) {

        let minutes, seconds;

        countDownInterval = setInterval(function() {

            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}`: minutes;
            seconds = seconds < 10 ? `0${seconds}`: seconds;

            countDownElement.innerHTML = `${minutes}:${seconds}`;

            if (--duration < 0) {

                clearInterval(countDownInterval);
                submiteButton.click();
            }   

        }, 1000);

    }
};


