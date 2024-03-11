// Define an array to store collections
let collections = [];

// Function to create a new collection
function createCollection(collectionName) {
    const newCollection = {
        id: Date.now(), // Generate unique ID
        name: collectionName,
        places: [] // Initialize an empty array to store favorite places
    };
    collections.push(newCollection);
    renderCollections();
}
// Function to delete a collection by ID
function deleteCollection(collectionId) {
    collections = collections.filter(collection => collection.id !== collectionId);
    renderCollections();
}
// Function to add a place to a collection
function addPlaceToCollection(collectionId, place) {
    const collection = collections.find(collection => collection.id === collectionId);
    if (collection) {
        collection.places.push(place);
        renderCollections();
    }
}
// Function to remove a place from a collection
function removePlaceFromCollection(collectionId, placeIndex) {
    const collection = collections.find(collection => collection.id === collectionId);
    if (collection) {
        collection.places.splice(placeIndex, 1);
        renderCollections();
    }
}
// Function to update the name of a collection
function updateCollectionName(collectionId, newName) {
    const collection = collections.find(collection => collection.id === collectionId);
    if (collection) {
        collection.name = newName;
        renderCollections();
    }
}
// Function to fetch weather information for a place
function fetchWeather(place) {
    // Your fetch API code here to retrieve weather information for the given place
    // Example:
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=9fd7a449d055dba26a982a3220f32aa2`)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            alert(`Weather for ${place}: ${weatherDescription}`);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            alert('Error fetching weather information.');
        });

}
// Function to render collections to the UI
function renderCollections() {
    const collectionsContainer = document.getElementById('collectionsContainer');
    collectionsContainer.innerHTML = '';

    collections.forEach(collection => {
        const collectionDiv = document.createElement('div');
        collectionDiv.classList.add('collection');

        // Add input field to update collection name
        const nameInput = document.createElement('input');
        nameInput.value = collection.name;
        nameInput.addEventListener('change', (event) => updateCollectionName(collection.id, event.target.value));
        collectionDiv.appendChild(nameInput);

        // Add delete button to delete the collection
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteCollection(collection.id));
        collectionDiv.appendChild(deleteButton);

        // Add input field and button to add a place to the collection
        const placeInput = document.createElement('input');
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Place';
        addButton.addEventListener('click', () => {
            const place = placeInput.value.trim();
            if (place !== '') {
                addPlaceToCollection(collection.id, place);
                placeInput.value = ''; // Clear input field after adding place
            }
        });
        collectionDiv.appendChild(placeInput);
        collectionDiv.appendChild(addButton);

        // List places in the collection
        const placesList = document.createElement('ul');
        collection.places.forEach((place, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = place;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removePlaceFromCollection(collection.id, index));
            listItem.appendChild(removeButton);

            // Add fetch button to retrieve weather information for each place
            const fetchButton = document.createElement('button');
            fetchButton.textContent = 'Fetch Weather';
            fetchButton.addEventListener('click', () => fetchWeather(place));
            listItem.appendChild(fetchButton);

            placesList.appendChild(listItem);
        });
        collectionDiv.appendChild(placesList);

        collectionsContainer.appendChild(collectionDiv);
    });
}
// Event listener for form submission to create a new collection
document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const collectionName = document.getElementById('collectionName').value;
    if (collectionName.trim() !== '') {
        createCollection(collectionName);
        document.getElementById('collectionName').value = ''; // Clear input field after submission
    }
});
// Initial rendering of collections
renderCollections();
