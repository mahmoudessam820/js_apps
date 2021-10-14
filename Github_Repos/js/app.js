// Github Repos

/*
 *  Task To Do:  
 * 
 *  [1] You have to make the same this app but with articles.
 *  [2] This is the URL of API (https://jsonplaceholder.typicode.com/) 
 *  
 */

// Main variables

let theInput    = document.querySelector('.get-repos input');
let getButton   = document.querySelector('.get-button');
let reposData   = document.querySelector('.show-data');

// Invoke fun
getButton.onclick = () => {

    getRepos();
};


// Get repos function
function getRepos() {

    // Check if input filed is empty
    if (theInput.value == "") { 
        
        // Create span element 
        reposData.innerHTML = "<span>Please Write GitHup Username</span>";

    } else {

        fetch(`https://api.github.com/users/${theInput.value}/repos`)

        .then((response) =>  response.json())

        .then((repositories) => {

            // Empty the container 
            reposData.innerHTML = "";

            // loop on repositories
            repositories.forEach((repo) => {

                // Create the main div
                let mainDiv = document.createElement('div');

                // Create repos name 
                let reposName = document.createTextNode(repo.name);

                // Append the text to main div
                mainDiv.appendChild(reposName);

                // Create repos URL anchor tag
                let theURL = document.createElement('a');

                // Create repos URL text
                let theUrlText = document.createTextNode('Visit');

                // Append the repos URL text to anchor tag
                theURL.appendChild(theUrlText);

                // Add the hypertext reference 'href'
                theURL.href = `https://github.com/${theInput.value}/${repo.name}`; 

                // Set attribute blank
                theURL.setAttribute('target', '_blank');

                // Append URL anchor tag to main div
                mainDiv.appendChild(theURL);

                // Create stars count span
                let starsSpan = document.createElement('span');

                // Create the stars count text
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

                // Add stars count text to stars span
                starsSpan.appendChild(starsText);

                // Append stars count span to main div
                mainDiv.appendChild(starsSpan);

                // Add class on main div
                mainDiv.className = 'repo-box';

                // Append the main div to container
                reposData.appendChild(mainDiv);

            });

        });    

    }
};

// https://github.com/ElzeroWebSchool/Ajax

