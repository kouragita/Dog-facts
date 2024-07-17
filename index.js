document.addEventListener('DOMContentLoaded', () => {
    const breedSelect = document.getElementById('breed-select');
    const fetchButton = document.getElementById('fetch-button');
    const dogImage = document.getElementById('dog-image');
    const dogFact = document.getElementById('dog-fact');
    const factForm = document.getElementById('dog-fact-form');
    const newFactInput = document.getElementById('new-fact');
    const updateButton = document.getElementById('update-button');
    const deleteButton = document.getElementById('delete-button');

    let lastFactId = null;

    // Fetch list of breeds
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;
            for (const breed in breeds) {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed;
                breedSelect.appendChild(option);
            }
        });

    // Fetch image and fact on button click
    fetchButton.addEventListener('click', () => {
        const selectedBreed = breedSelect.value;

        // Fetch dog image
        fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
            .then(response => response.json())
            .then(data => {
                dogImage.src = data.message;
            });

        // Fetch random dog fact
        fetch('https://dog-api.kinduff.com/api/facts?number=1')
            .then(response => response.json())
            .then(data => {
                dogFact.textContent = data.facts[0];
                // Also fetch local facts
                fetch('http://localhost:3000/facts')
                    .then(response => response.json())
                    .then(localFacts => {
                        const allFacts = [data.facts[0], ...localFacts.map(fact => fact.fact)];
                        dogFact.textContent = allFacts[Math.floor(Math.random() * allFacts.length)];
                        lastFactId = localFacts[0] ? localFacts[0].id : null;
                    });
            });
    });

    // Add a new fact
    factForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newFact = newFactInput.value;

        fetch('http://localhost:3000/facts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fact: newFact })
        })
        .then(response => response.json())
        .then(data => {
            alert('Fact added successfully!');
            newFactInput.value = '';
            lastFactId = data.id;
        });
    });

    // Update the last fact
    updateButton.addEventListener('click', () => {
        const updatedFact = prompt('Enter the updated fact:');

        fetch(`http://localhost:3000/facts/${lastFactId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fact: updatedFact })
        })
        .then(response => response.json())
        .then(data => {
            alert('Fact updated successfully!');
            dogFact.textContent = updatedFact;
        });
    });

    // Delete the last fact
    deleteButton.addEventListener('click', () => {
        fetch(`http://localhost:3000/facts/${lastFactId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Fact deleted successfully!');
            dogFact.textContent = '';
        });
    });
});
