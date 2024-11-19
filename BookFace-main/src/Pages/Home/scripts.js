
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