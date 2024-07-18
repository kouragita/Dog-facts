document.addEventListener('DOMContentLoaded', () => {
    const breedSelect = document.getElementById('breed-select');//drop down menu
    const fetchButton = document.getElementById('fetch-button');//fetch images and facts
    const dogImage = document.getElementById('dog-image');
    const dogFact = document.getElementById('dog-fact');
    const factForm = document.getElementById('dog-fact-form');//incorporates everything from where i will write to add a new fact, to buttons of adding, updating and deleting facts.
    const newFactInput = document.getElementById('new-fact');
    const updateButton = document.getElementById('update-button');
    const deleteButton = document.getElementById('delete-button');

    let lastFactId = null;//empty

    // Fetch list of breeds
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;//lists breeds data
            for (const breed in breeds) {
                const option = document.createElement('option');//creates new option element, like a new item in a drop down menu.
                option.value = breed;// sets the value of the option to be the breed name.
                option.textContent = breed;//sets the text inside the option to be the breed name.
                breedSelect.appendChild(option);//adds the new option to the drop-down menu we have on our web page (the select element with id'breed-select').
            }
        });

    // Fetch image and fact on button click
    fetchButton.addEventListener('click', () => {
        const selectedBreed = breedSelect.value;//gets the breed that the user selected from the drop-down menu (with the ID breed-select) and stores it in a variable called selectedBreed.

        // Fetch dog image
        fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)//${selectedBreed} part puts the selected breed into the URL.
            .then(response => response.json())
            .then(data => {
                dogImage.src = data.message;
            });//takes the image URL from the data and sets it as the source of the image element with the ID dog-image.

        // Fetch random dog fact
        fetch('https://dog-api.kinduff.com/api/facts?number=1')//This line sends a request to the Dog API to fetch one random dog fact. The ?number=1 part of the URL specifies that we want only one fact.
            .then(response => response.json())//converts response from JSON format to a JavaScript object that can be used in the code.

            .then(data => {
                dogFact.textContent = data.facts[0];//after the data is converted to javascript object, takes the first fact from the data and sets it as the text content of the HTML element with the ID dog-fact. 
                // Also fetch local facts
                fetch('http://localhost:3000/facts')
                    .then(response => response.json())
                    .then(localFacts => {
                        const allFacts = [data.facts[0], ...localFacts.map(fact => fact.fact)];//combining both local and remote facts. the spread operator is used to iterlate through and merge both arrays, hence the .map returns a new array that combine both sets of data.
                        dogFact.textContent = allFacts[Math.floor(Math.random() * allFacts.length)];//selects a random fact from the combined list of facts and sets it as the text content of the dogfact element
                        lastFactId = localFacts[0] ? localFacts[0].id : null;//store the id of the last fact. used for updating(patch), or deleting the last fact.
                    });//all this processes the retrived facts from the local server
            });
    });

    // Add a new fact
    factForm.addEventListener('submit', (e) => {
        e.preventDefault();//event listener for when the form with the ID dog-fact-form is submitted and prevents the default form submission behavior, which would normally reload the page.

        const newFact = newFactInput.value;//gets the value of the input field with the ID new-fact, which is where the user enters the new dog fact.
        //Send a POST Request to the Server:
        fetch('http://localhost:3000/facts', {
            method: 'POST',// indicates that this request is creating a new resource.
            headers: {
                'Content-Type': 'application/json'
            },//specifies that the request body will be in JSON format.
            body: JSON.stringify({ fact: newFact })//converting the property fact into new fact and asing it as a json string to the api. remmber the json.stringify helps convert a js object to json string.
        })
        .then(response => response.json())//processes the server's response, converting it from JSON format to a JavaScript object.
        .then(data => {
            alert('Fact added successfully!');//an alert is shown to the user indicating that the fact was added successfully.
            newFactInput.value = '';//clears the input field where the user entered the new fact.
            lastFactId = data.id;// stores the ID of the newly created fact in the lastFactId variable. This ID can be used later for updating or deleting the fact.
        });
    });

    // Update the last fact
    updateButton.addEventListener('click', () => {
        const updatedFact = prompt('Enter the updated fact:');//event listener that listens for the click event on the update button with the ID update-button.
        //When the button is clicked, it triggers a prompt asking the user to enter the updated fact. The input from this prompt is stored in the updatedFact variable.

        //Send a PATCH Request to the Server:
        fetch(`http://localhost:3000/facts/${lastFactId}`, {
            method: 'PATCH',//sends a PATCH request to the local server's/facts/{lastFactId}` endpoint.The method: 'PATCH' line indicates that this request is updating an existing resource.
            headers: {
                'Content-Type': 'application/json'
            },//specifies that the request body will be in JSON format.
            body: JSON.stringify({ fact: updatedFact })// converts the JavaScript object { fact: updatedFact } into a JSON string to be sent in the request body. This JSON string contains the updated fact entered by the user.
        })
        .then(response => response.json())//processes the server's response, converting it from JSON format to a JavaScript object.
        .then(data => {
            alert('Fact updated successfully!');// an alert is shown to the user indicating that the fact was updated successfully.
            dogFact.textContent = updatedFact;//updates the displayed fact in the HTML element with the ID dog-fact to show the updated fact.
        });
    });

    // Delete the last fact
    // adds an event listener to the deleteButton element. When the button is clicked, the code inside the callback function will be executed.
    deleteButton.addEventListener('click', () => {
        fetch(`http://localhost:3000/facts/${lastFactId}`, {
            method: 'DELETE'
        })//sends a DELETErequest to the server to delete a fact with the ID stored in thelastFactIdvariable. Thefetch` function returns a promise that resolves to the response object.
        .then(response => response.json())
        .then(data => {
            alert('Fact deleted successfully!');// displays an alert box with the message "Fact deleted successfully!".
            dogFact.textContent = '';//sets the text content of an element with the ID dogFact to an empty string, effectively clearing the element's content.
        });
    });
});
