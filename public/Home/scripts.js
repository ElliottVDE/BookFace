const $ = selector => document.querySelector(selector);
let posts = [];

const fetchPosts = () => {
    fetch('/data/posts.json')
    .then(response => response.json())
    .then(fetchedPosts => {
        // Update the posts array with the fetched data
        posts = fetchedPosts;
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts(posts);
    })
    .catch(error => console.error("Error fetching posts:", error));
};

const addPost = () => {
    const name = $("#name").value.trim();
    const description = $("#description").value.trim();
    const imageInput = $("#image");

    if (name) {
        if (description) {
            if (imageInput != "") {
                const post = { 
                    name, 
                    description, 
                    image: imageInput.files[0] || {}
                };

                // Save to localStorage
                posts = JSON.parse(localStorage.getItem('posts') || '[]');
                posts.push(post);
                localStorage.setItem('posts', JSON.stringify(posts));
                
                // Send post to server to update the JSON file
                fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post)
                })
                .then(response => response.json())
                .then(updatedPosts => {
                    console.log("Post saved on server:", updatedPosts);
                    displayPosts(updatedPosts); // Update the display with new posts
                })
                .catch(error => {
                    console.error("Error saving post on server:", error);
                    alert("There was an error saving the post.");
                });
            } else {
                alert("Image must be a valid entry.");
                $("#image").focus();
            }
        } else {
        alert("Description must be a valid entry.");
        $("#description").focus();
        }
    } else {
        alert("Name must be a valid entry.");
        $("#name").focus();
    }
};

const displayPosts = () => {
    const postsContainer = $("#postsContainer");
    postsContainer.innerHTML = "<h2>Posts:</h2s>"; 
    posts.reverse().forEach(post => {
        const postElement = document.createElement("div");

        const nameElement = document.createElement("strong");
        nameElement.textContent = post.name; // Display name
        postElement.appendChild(nameElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = post.description; // Display description
        postElement.appendChild(descriptionElement);

        if (post.image) {
            const imgElement = document.createElement('img');

            // If the image is a File/Blob, use createObjectURL
            if (post.image instanceof Blob || post.image instanceof File) {
                imgElement.src = URL.createObjectURL(post.image);  // Handle as Blob/File
            } else {
                imgElement.src = post.image;  // Handle as a string URL
            }

            imgElement.style.maxWidth = "200px";  // Optional: Set max width for the image
            imgElement.style.display = "block";   // Make sure the image displays as a block

            postElement.appendChild(imgElement);  // Append the image to the post
        }

        postsContainer.appendChild(postElement);
    });
};

function hideSection(sectionId, button) {

    // Show the selected section
    let sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'none';
    }
};

function showSection(sectionId, button) {

    // Show the selected section
    let sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
};

document.addEventListener("DOMContentLoaded", fetchPosts);
document.addEventListener("DOMContentLoaded", () => {
    $("#post").addEventListener("click", addPost);
    $("#name").value = "";
    $("#description").value = ""; 
    $("#image").value = ""; 
});