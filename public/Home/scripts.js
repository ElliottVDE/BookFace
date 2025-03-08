<<<<<<< HEAD
const $ = selector => document.querySelector(selector);
let posts = [];

const fetchPosts = () => {
    fetch('/data/posts.json')
        .then(response => response.json())
        .then(fetchedPosts => {
            // 1. Save the raw fetched data
            posts = fetchedPosts;
            localStorage.setItem('posts', JSON.stringify(posts));

            // 2. Retrieve the user’s joined group IDs from localStorage
            // (If not found, default to an empty array)
            const joinedGroups = JSON.parse(localStorage.getItem('joinedGroups') || '[]');

            // 3. Filter the posts if the user has joined any groups
            let filteredPosts;
            if (joinedGroups.length > 0) {
                filteredPosts = posts.filter(p => joinedGroups.includes(p.groupId));
            } else {
                // If user has not joined anything, show all posts (or you could show none—your choice)
                filteredPosts = posts;
            }

            // 4. Display only the filtered posts
            displayPosts(filteredPosts);
        })
        .catch(error => console.error("Error fetching posts:", error));
};


const addPost = () => {
    const name = $("#name").value.trim();
    const description = $("#description").value.trim();
    const imageInput = $("#image");

    if (name) {
        if (description) {
            if (imageInput.value) {
                const post = {
                    name,
                    description,
                    image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : ""
                };

                posts = JSON.parse(localStorage.getItem('posts') || '[]');
                posts.push(post);
                localStorage.setItem('posts', JSON.stringify(posts));

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
                        displayPosts(updatedPosts); // Update the display
                    })
                    .catch(error => {
                        console.error("Error saving post on server:", error);
                        alert("There was an error saving the post.");
                    });
            } else {
                alert("Please upload a valid image.");
                $("#image").focus();
            }
        } else {
            alert("Description is required.");
            $("#description").focus();
        }
    } else {
        alert("Name is required.");
        $("#name").focus();
    }
};

const displayPosts = () => {
    const postsContainer = $("#postsContainer");
    postsContainer.innerHTML = ""; // Clear previous posts

    postsToDisplay.slice().reverse().forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");
        postHeader.textContent = post.name;

        const postDescription = document.createElement("div");
        postDescription.classList.add("post-description");
        postDescription.textContent = post.description;

        postCard.appendChild(postHeader);
        postCard.appendChild(postDescription);

        if (post.image) {
            const postImage = document.createElement("img");
            postImage.src = post.image;
            postImage.alt = "Post Image";
            postCard.appendChild(postImage);
        }

        postsContainer.appendChild(postCard);
    });
};

function hideSection(sectionId, button) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'none';
    }
}

function showSection(sectionId, button) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", fetchPosts);
document.addEventListener("DOMContentLoaded", () => {
    $("#post").addEventListener("click", addPost);
    $("#name").value = "";
    $("#description").value = "";
    $("#image").value = "";
});
=======
const $ = selector => document.querySelector(selector);
let posts = [];

const fetchPosts = () => {
    fetch('/data/posts.json')
        .then(response => response.json())
        .then(fetchedPosts => {
            posts = fetchedPosts; // Update the posts array with the fetched data
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts(posts); // Display posts
        })
        .catch(error => console.error("Error fetching posts:", error));
};

const addPost = () => {
    const name = $("#name").value.trim();
    const description = $("#description").value.trim();
    const imageInput = $("#image");

    if (name) {
        if (description) {
            if (imageInput.value) {
                const post = {
                    name,
                    description,
                    image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : ""
                };

                posts = JSON.parse(localStorage.getItem('posts') || '[]');
                posts.push(post);
                localStorage.setItem('posts', JSON.stringify(posts));

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
                        displayPosts(updatedPosts); // Update the display
                    })
                    .catch(error => {
                        console.error("Error saving post on server:", error);
                        alert("There was an error saving the post.");
                    });
            } else {
                alert("Please upload a valid image.");
                $("#image").focus();
            }
        } else {
            alert("Description is required.");
            $("#description").focus();
        }
    } else {
        alert("Name is required.");
        $("#name").focus();
    }
};

const displayPosts = () => {
    const postsContainer = $("#postsContainer");
    postsContainer.innerHTML = ""; // Clear previous posts

    posts.slice().reverse().forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");
        postHeader.textContent = post.name;

        const postDescription = document.createElement("div");
        postDescription.classList.add("post-description");
        postDescription.textContent = post.description;

        postCard.appendChild(postHeader);
        postCard.appendChild(postDescription);

        if (post.image) {
            const postImage = document.createElement("img");
            postImage.src = post.image;
            postImage.alt = "Post Image";
            postCard.appendChild(postImage);
        }

        postsContainer.appendChild(postCard);
    });
};

function hideSection(sectionId, button) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'none';
    }
}

function showSection(sectionId, button) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", fetchPosts);
document.addEventListener("DOMContentLoaded", () => {
    $("#post").addEventListener("click", addPost);
    $("#name").value = "";
    $("#description").value = "";
    $("#image").value = "";
});
>>>>>>> 9d8c0555e9581d00aa82fa052eb9010728286126
