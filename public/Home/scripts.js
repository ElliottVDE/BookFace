const $ = selector => document.querySelector(selector);
let posts = [];

const fetchPosts = () => {
    fetch('http://localhost:5050/post')
        .then(response => response.json())
        .then(fetchedPosts => {
            posts = fetchedPosts; // Update the posts array with the fetched data
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts(posts); // Display posts
        })
        .catch(error => console.error("Error fetching posts:", error));
};

const addPost = async () => {
    const name = $("#name").value.trim();
    const desc = $("#description").value.trim();
    const imageInput = $("#image");

    if (name) {
        if (description) {
            if (imageInput.value) {
                const base64 = await convertToBase64(imageInput.files[0]);
                const post = {
                    name,
                    desc,
                    image: base64
                };
                console.log(post);
                posts = JSON.parse(localStorage.getItem('posts') || '[]');
                posts.push(post);
                localStorage.setItem('posts', JSON.stringify(posts));

                fetch('http://localhost:5050/post', {
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
        postDescription.textContent = post.desc;

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