"use strict";

function showSection(sectionId, element) {
    var sections = document.getElementsByClassName('section');
    for(var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    document.getElementById(sectionId).classList.add('active');
    // Update active tab
    var tabs = document.querySelectorAll('nav a');
    tabs.forEach(function(tab) {
        tab.classList.remove('active-tab');
    });
    element.classList.add('active-tab');
}

window.onload = function() {
    showSection('home', document.querySelector('nav a[data-section="home"]')); // Show the home section by default
    // Initialize profile data
    initializeProfile();
}

// Profile Data
var profileData = {
    name: "[Your Name]",
    email: "your.email@example.com",
    location: "[Your City, Country]",
    aboutMe: "Passionate about technology, music, and travel. Always eager to learn new things and meet new people.",
    profilePicture: "https://via.placeholder.com/150"
};

function initializeProfile() {
    document.getElementById('profile-name').innerText = profileData.name;
    document.getElementById('profile-email').innerText = profileData.email;
    document.getElementById('profile-location').innerText = profileData.location;
    document.getElementById('profile-about').innerText = profileData.aboutMe;
    document.getElementById('profile-picture').src = profileData.profilePicture;
}

function editProfile() {
    // Show save and cancel buttons, hide edit button
    document.getElementById('edit-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'inline-block';
    document.getElementById('cancel-button').style.display = 'inline-block';

    // Replace profile fields with input fields
    document.getElementById('profile-name').innerHTML = '<input type="text" id="input-name" value="' + profileData.name + '">';
    document.getElementById('profile-email').innerHTML = '<input type="email" id="input-email" value="' + profileData.email + '">';
    document.getElementById('profile-location').innerHTML = '<input type="text" id="input-location" value="' + profileData.location + '">';
    document.getElementById('profile-about').innerHTML = '<textarea id="input-about">' + profileData.aboutMe + '</textarea>';
    document.getElementById('profile-picture').outerHTML = '<input type="text" id="input-picture" value="' + profileData.profilePicture + '" placeholder="Enter image URL">';
}

function saveProfile() {
    // Get values from input fields
    profileData.name = document.getElementById('input-name').value;
    profileData.email = document.getElementById('input-email').value;
    profileData.location = document.getElementById('input-location').value;
    profileData.aboutMe = document.getElementById('input-about').value;
    profileData.profilePicture = document.getElementById('input-picture').value || "https://via.placeholder.com/150";

    // Update profile display
    initializeProfile();

    // Show edit button, hide save and cancel buttons
    document.getElementById('edit-button').style.display = 'inline-block';
    document.getElementById('save-button').style.display = 'none';
    document.getElementById('cancel-button').style.display = 'none';
}

function cancelEdit() {
    // Restore original profile display
    initializeProfile();

    // Show edit button, hide save and cancel buttons
    document.getElementById('edit-button').style.display = 'inline-block';
    document.getElementById('save-button').style.display = 'none';
    document.getElementById('cancel-button').style.display = 'none';
}

const posts = [];
const $ = selector => document.querySelector(selector);

const addPost = () => {
    const name = $("#name").value.trim();
    const description = $("#description").value.trim();
    const imageInput = $("#image");

    if (description) {
        if (name){
            if (image){
                const post = { name, 
                    description, 
                    image: imageInput.files[0] };
                posts.push(post);
                displayPosts();
            }
            else {
                alert("Image must be a valid entry.");
                $("#image").focus();
            }
        }
        else {
            alert("Name must be a valid entry.");
            $("#name").focus();
        }
    }
    else {
        alert("Description must be a valid entry.");
        $("#description").focus();
    }
};

const displayPosts = () => {
    const postsContainer = $("#postsContainer");
    postsContainer.innerHTML = "<h2>Posts:</h2>"; 
    posts.forEach(post => {
        const postElement = document.createElement("div");

        const nameElement = document.createElement("strong");
        nameElement.textContent = post.name; // Display name
        postElement.appendChild(nameElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = post.description; // Display description
        postElement.appendChild(descriptionElement);

        if (post.image) {
            const imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(post.image); // Create a URL for the image
            imgElement.style.maxWidth = "200px"; // Set max width for the image
            imgElement.style.display = "block"; // Display block to avoid inline issues
            postElement.appendChild(imgElement);
        }

        postsContainer.appendChild(postElement);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    $("#post").addEventListener("click", addPost);
    $("#name").value = "";
    $("#description").value = ""; 
    $("#image").value = ""; 
});