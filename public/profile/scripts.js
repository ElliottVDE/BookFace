let username = localStorage.getItem('username');
const $ = selector => document.querySelector(selector);
let posts = [];

const fetchPosts = () => {
    const API_BASE = location === 'localhost'
    ? 'http://localhost:5050'
    : 'https://bookface-9q1u.onrender.com';
    fetch(`${API_BASE}/post`)
        .then(response => response.json())
        .then(data => {
            const posts = data; // Update the posts array with the fetched data
            if (Array.isArray(posts)) {
                displayPosts(posts);
              } else {
                console.error("Posts is not an array:", posts);
              }
            localStorage.setItem('posts', JSON.stringify(posts));
                
        })
        .catch(error => console.error("Error fetching posts:", error));
};

const fetchUser = () => {
    const API_BASE = location.hostname === 'localhost'
      ? 'http://localhost:5050'
      : 'https://bookface-9q1u.onrender.com';
  
    fetch(`${API_BASE}/user/profile/${username}`)
      .then(response => response.json())
      .then(fetchedUser => {
        // Create a filtered object with only desired fields
        const savedUser = {
          name: fetchedUser.name,
          email: fetchedUser.email,
          location: fetchedUser.location,
          about: fetchedUser.about,
          groups: fetchedUser.groups,
          picture: fetchedUser.picture,
          saved: fetchedUser.saved
        };
  
        // Store the filtered object as a JSON string
        localStorage.setItem('User', JSON.stringify(savedUser));
      })
      .catch(error => console.error("Error fetching user:", error));
  };

// Elements for displaying and editing profile data
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileLocation = document.getElementById('profile-location');
const profileAbout = document.getElementById('profile-about');
const profilePicture = document.getElementById('profile-picture');
const editPicture = document.getElementById('edit-picture');

const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

let editing = false;
let originalData = {}; // To store the original data for cancel functionality

const updateUser = async (updatedUser) => {
    try {
        const API_BASE = location === 'localhost'
        ? 'http://localhost:5050'
        : 'https://bookface-9q1u.onrender.com';
        const response = await fetch(`${API_BASE}/user/${username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: updatedUser.name , email: updatedUser.email ,
                location: updatedUser.location , about: updatedUser.about, picture: updatedUser.picture
             })
        });

        if (!response.ok) {
            throw new Error("Failed to update saved posts");
        }

        console.log("Saved posts updated!");
    } catch (error) {
        console.error("Error updating saved posts:", error);
    }
    fetchUser;
};

document.addEventListener("DOMContentLoaded", fetchPosts);

async function loadProfile() {
    let user = JSON.parse(localStorage.getItem('User'));
    if (user) {
        // Populate profile fields with the user data
        profileName.textContent = user.name || 'No name available';
        profileEmail.textContent = user.email || 'No email available';
        profileLocation.textContent = user.location || 'No location available';
        profileAbout.textContent = user.about || 'No about information available';
        profilePicture.src = user.picture || 'default-picture.jpg'; // Use a default image if not available
    } else {
        console.warn('No user data found in localStorage.');
    }
}

document.addEventListener("DOMContentLoaded", loadProfile);
document.addEventListener("DOMContentLoaded", fetchUser);

const displayPosts = (posts) => {
    const postsContainer = $("#postsContainer");
    let saves = [];

    try {
      const raw = localStorage.getItem("savedPosts");
      saves = raw && raw !== "undefined" && raw !== null ? JSON.parse(raw) : [];
    } catch (e) {
      saves = [];
    }
    // if (savedData) {
    //     try {
    //         saves = JSON.parse(savedData);
    //     } catch (e) {
    //         console.error("Failed to parse saved posts:", e);
    //         saves = [];
    //     }
    // }
    postsContainer.innerHTML = ""; // Clear previous posts
    

    const savedPosts = posts.filter(post => saves.includes(post._id));
    console.log(savedPosts);
    savedPosts.slice().reverse().forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");
        isSaved = saves.includes(post._id);

        // Post header (name)
        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");
        postHeader.textContent = post.name;

        postCard.appendChild(postHeader);
        // Description logic
        const fullText = post.desc;
        const shortText = fullText.slice(0, 80);
        const remainingText = fullText.slice(80);
        const charLimit = 80;

        const description = document.createElement("p");
        description.classList.add("post-description");

        const shortTextNode = document.createElement("span");
        // const shortTextNode = document.createTextNode(shortText);
        shortTextNode.textContent = shortText;
        shortTextNode.style.display = "inline";
        shortTextNode.classList.add("short-text");

        const moreTextSpan = document.createElement("span");
        moreTextSpan.textContent = fullText;
        moreTextSpan.style.display = "none";
        moreTextSpan.classList.add("more-text");

        description.appendChild(shortTextNode);
        description.appendChild(moreTextSpan);
        postCard.appendChild(description);


        // Show More / Less Button
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Show More";
        toggleButton.classList.add("toggle-button");

        toggleButton.addEventListener("click", () => {
            const isHidden = moreTextSpan.style.display === "none";
            moreTextSpan.style.display = isHidden ? "inline" : "none";
            shortTextNode.style.display = isHidden ? "none" : "inline";
            toggleButton.textContent = isHidden ? "Show Less" : "Show More";
        });
        if (post.desc.length > charLimit) {
            postCard.appendChild(toggleButton);
            }

        // Add image
        if (post.image !== null) {
            const postImage = document.createElement("img");
            postImage.src = post.image;
            postImage.alt = "Post Image";
            postCard.appendChild(postImage);
        }

        postsContainer.appendChild(postCard);
 });

}

function editProfile() {
    if (editing) return; // Prevent multiple edit states
    editing = true;
    const imageInput = $("profile-picture");
    console.log(imageInput);

    // Save original data
    originalData = {
        name: profileName.textContent,
        email: profileEmail.textContent,
        location: profileLocation.textContent,
        about: profileAbout.textContent,
        picture: profilePicture.textContent
    };

    // Convert profile fields to editable inputs
    profileName.innerHTML = `<input type="text" id="edit-name" value="${originalData.name}">`;
    profileEmail.innerHTML = `<input type="email" id="edit-email" value="${originalData.email}">`;
    profileLocation.innerHTML = `<input type="text" id="edit-location" value="${originalData.location}">`;
    profilePicture.innerHTML = `<input type="img" id="profile-picture" value="${originalData.picture}">`;
    profileAbout.innerHTML = `<textarea id="edit-about">${originalData.about}</textarea>`;
    
    // Enable profile picture upload
    profilePicture.insertAdjacentHTML('afterend', '<input type="file" id="edit-picture" accept="image/*">');
    saveButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    editButton.style.display = 'none';
}

async function saveProfile() {
    if (!editing) return;
    const imageInput = $("#edit-picture");
    const file = imageInput.files[0];
    let base64 = imageInput;

    if(file){
    if (file.size >60000) {
        alert(`Image is too large.`);
    } else {
        console.log("Image size is OK!");
        base64 = await convertToBase64(file);

    }
    }
    // Get updated data from inputs
    const updatedData = {
        name: document.getElementById('edit-name').value,
        email: document.getElementById('edit-email').value,
        location: document.getElementById('edit-location').value,
        about: document.getElementById('edit-about').value,
        picture: base64
    };

    // Check for uploaded picture
    if (imageInput && file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            updatedData.picture = e.target.result;
            applyProfileData(updatedData);
        };
        reader.readAsDataURL(file);
    } else {
        updatedData.picture = profilePicture.src;
        applyProfileData(updatedData);
    }

    
    editing = false;
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
    editButton.style.display = 'inline';
    location.reload();
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
    let user = JSON.parse(localStorage.getItem('User'));

    profileName.textContent = data.name;
    user.name = data.name;
    profileEmail.textContent = data.email;
    user.email = data.email;
    profileLocation.textContent = data.location;
    user.location = data.location;
    profileAbout.textContent = data.about;
    user.about = data.about;
    profilePicture.textContent = data.picture;
    user.picture = data.picture;
    

    
    localStorage.setItem('User', JSON.stringify(user));
    updateUser(user);
}


function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}