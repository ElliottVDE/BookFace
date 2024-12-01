// Elements for displaying and editing profile data
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileLocation = document.getElementById('profile-location');
const profileAbout = document.getElementById('profile-about');
const profilePicture = document.getElementById('profile-picture');

const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

let editing = false;
let originalData = {}; // To store the original data for cancel functionality

// Populate initial profile data (you can replace this with actual data from an API or database)
const initialData = {
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
    about: "Web developer and tech enthusiast.",
    picture: "https://via.placeholder.com/150"
};

function loadProfile() {
    profileName.textContent = initialData.name;
    profileEmail.textContent = initialData.email;
    profileLocation.textContent = initialData.location;
    profileAbout.textContent = initialData.about;
    profilePicture.src = initialData.picture;
}

loadProfile();

function editProfile() {
    if (editing) return; // Prevent multiple edit states
    editing = true;

    // Save original data
    originalData = {
        name: profileName.textContent,
        email: profileEmail.textContent,
        location: profileLocation.textContent,
        about: profileAbout.textContent,
        picture: profilePicture.src
    };

    // Convert profile fields to editable inputs
    profileName.innerHTML = `<input type="text" id="edit-name" value="${originalData.name}">`;
    profileEmail.innerHTML = `<input type="email" id="edit-email" value="${originalData.email}">`;
    profileLocation.innerHTML = `<input type="text" id="edit-location" value="${originalData.location}">`;
    profileAbout.innerHTML = `<textarea id="edit-about">${originalData.about}</textarea>`;
    
    // Enable profile picture upload
    profilePicture.insertAdjacentHTML('afterend', '<input type="file" id="edit-picture" accept="image/*">');
    saveButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    editButton.style.display = 'none';
}

function saveProfile() {
    if (!editing) return;

    // Get updated data from inputs
    const updatedData = {
        name: document.getElementById('edit-name').value,
        email: document.getElementById('edit-email').value,
        location: document.getElementById('edit-location').value,
        about: document.getElementById('edit-about').value
    };

    // Check for uploaded picture
    const pictureInput = document.getElementById('edit-picture');
    if (pictureInput && pictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            updatedData.picture = e.target.result;
            applyProfileData(updatedData);
        };
        reader.readAsDataURL(pictureInput.files[0]);
    } else {
        updatedData.picture = profilePicture.src;
        applyProfileData(updatedData);
    }

    // Remove the picture input after saving
    if (pictureInput) {
        pictureInput.remove();
    }

    editing = false;
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
    editButton.style.display = 'inline';
}


function cancelEdit() {
    if (!editing) return;

    // Restore original data
    applyProfileData(originalData);

    // Remove the picture input
    const pictureInput = document.getElementById('edit-picture');
    if (pictureInput) {
        pictureInput.remove();
    }

    editing = false;
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
    editButton.style.display = 'inline';
}

function applyProfileData(data) {
    profileName.textContent = data.name;
    profileEmail.textContent = data.email;
    profileLocation.textContent = data.location;
    profileAbout.textContent = data.about;
    profilePicture.src = data.picture;
}
