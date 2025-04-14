const $ = selector => document.querySelector(selector);
let posts = [];

const fetchPosts = () => {
    fetch('http://localhost:5050/post')
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
let username = localStorage.getItem('username');

const fetchSaves = () => {
  fetch(`http://localhost:5050/user/${username}`)
  .then(response => response.json())
  .then(fetchedUser => {
      // Update the posts array with the fetched data
      const user = fetchedUser;
      const savedPosts = JSON.stringify(user.saved);
      localStorage.setItem('savedPosts', savedPosts);
  })
  .catch(error => console.error("Error fetching users:", error));
};

const updateSaves = async (updatedSavedPosts) => {
    try {
        const response = await fetch(`http://localhost:5050/user/${username}/saves`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ saved: updatedSavedPosts })
        });

        if (!response.ok) {
            throw new Error("Failed to update saved posts");
        }

        console.log("Saved posts updated!");
    } catch (error) {
        console.error("Error updating saved posts:", error);
    }
};

const addPost = async () => {
    const name = $("#name").value.trim();
    const desc = $("#description").value.trim();
    const imageInput = $("#image");

    if (name) {
        if (desc) {
            if (imageInput.value) {
                var posted;
                const file = imageInput.files[0];
                console.log(file);

                if (file.size > 60000) {
                    alert(`Image is too large.`);
                } else {
                    console.log("Image size is OK!");
                    posted = true;
                }
                if (posted){
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
                        fetchPosts();
                    })
                    .catch(error => {
                        console.error("Error saving post on server:", error);
                        alert("There was an error saving the post.");
                    });
                }
            } else {
                const post = {
                    name,
                    desc,
                    image: null
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
                    fetchPosts();
                })
                .catch(error => {
                    console.error("Error saving post on server:", error);
                    alert("There was an error saving the post.");
                });
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

const displayPosts = (posts) => {
    const postsContainer = $("#postsContainer");
    let saves = [];
    postsContainer.innerHTML = ""; // Clear previous posts
    saves = JSON.parse(localStorage.getItem("savedPosts")) || [];
    posts.slice().reverse().forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");
        isSaved = saves.includes(post._id);

        // Post header (name)
        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");
        postHeader.textContent = post.name;

        // Show More / Less Button
        const saveButton = document.createElement("button");
        saveButton.textContent = isSaved ? "Saved" : "Save";
        saveButton.classList.add("toggle-button");
        // saveButton.classList.toggle("saved", isSaved);
        
        postHeader.appendChild(saveButton);
        postCard.appendChild(postHeader);
        // Description logic
        const fullText = post.desc;
        const shortText = fullText.slice(0, 80);
        const remainingText = fullText.slice(80);
        const charLimit = 80;

        const description = document.createElement("p");
        description.classList.add("post-description");

        const shortTextNode = document.createTextNode(shortText);
        const moreTextSpan = document.createElement("span");
        moreTextSpan.textContent = remainingText;
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
        saveButton.addEventListener("click", () => {
            let saves = [];
            isSaved = !isSaved;
            saveButton.textContent = isSaved ? "Saved" : "Save";
            saveButton.classList.toggle("saved", isSaved);

            saves = JSON.parse(localStorage.getItem("savedPosts")) || [];

            if(isSaved){
                if (!saves.includes(post._id)) {
                    saves.push(post._id);
                    console.log(saves);
                }
            } 
            else
            {
                let idToRemove = post._id;
                console.log(saves + " Data before");
                // const indexToDelete = saves.findIndex(item => item._id === idToRemove);
                // if (indexToDelete !== -1) {
                //     saves.splice(indexToDelete, 1);
                // }
                saves = saves.filter(_id => _id !== post._id);

                console.log(saves + " Data after");

            }

            localStorage.setItem('savedPosts', JSON.stringify(saves));
            updateSaves(saves);
            });

        postsContainer.appendChild(postCard);
 });

}

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
document.addEventListener("DOMContentLoaded", fetchSaves);
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
