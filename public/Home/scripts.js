
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
let username = localStorage.getItem('username');

const fetchSaves = () => {
    const API_BASE = location === 'localhost'
    ? 'http://localhost:5050'
    : 'https://bookface-9q1u.onrender.com';
  
  fetch(`${API_BASE}/user/profile/${username}`)
  .then(response => response.json())
  .then(fetchedUser => {
      // Update the posts array with the fetched data
      const user = fetchedUser;
      const savedPosts = JSON.stringify(user.saved);
      localStorage.setItem('savedPosts', savedPosts);
  })
  .catch(error => console.error("Error fetching users:", error));
};

const fetchGroups = () => {
    const API_BASE = location === 'localhost'
    ? 'http://localhost:5050'
    : 'https://bookface-9q1u.onrender.com';
  
    fetch(`${API_BASE}/groups`)
        .then(response => response.json())
        .then(data => {
            const groups = data; 
            // Update the posts array with the fetched data
            // if (Array.isArray(groups)) {
            //     displayGroups(groups);
            //   } else {
            //     console.error("Posts is not an array:", groups);
            //   }
            localStorage.setItem('groups', JSON.stringify(groups));
            fetchPosts();
        })
        .catch(error => console.error("Error fetching groups:", error));
};
const fetchJoined= () => {
    const API_BASE = location === 'localhost'
    ? 'http://localhost:5050'
    : 'https://bookface-9q1u.onrender.com';
  
    fetch(`${API_BASE}/groups`)
        .then(response => response.json())
        .then(data => {
            const groups = data; // Update the posts array with the fetched data
            // if (Array.isArray(groups)) {
            //     displayGroups(groups);
            //   } else {
            //     console.error("Posts is not an array:", groups);
            //   }
            localStorage.setItem('groups', JSON.stringify(groups));
                
        })
        .catch(error => console.error("Error fetching posts:", error));
};

const updateSaves = async (updatedSavedPosts) => {
    const API_BASE = location === 'localhost'
    ? 'http://localhost:5050'
    : 'https://bookface-9q1u.onrender.com';
  
    fetch(`${API_BASE}/post`)
    try {
        const response = await fetch(`${API_BASE}/user/${username}/saves`, {
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
const updateJoins = async (updatedGroups) => {
    const API_BASE = location === 'localhost'
    ? 'http://localhost:5050'
    : 'https://bookface-9q1u.onrender.com';
    try {
        const response = await fetch(`${API_BASE}/user/${username}/groups`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ groups: updatedGroups })
        });

        if (!response.ok) {
            throw new Error("Failed to update saved groups");
        }
        
        console.log("Saved groups updated!");
        console.log("Saved groups:" + updatedGroups);
    } catch (error) {
        console.error("Error updating saved groups:", error);
    }
};

const deletePost = async (ID) => {
    const API_BASE = location.hostname === 'localhost'
        ? 'http://localhost:5050'
        : 'https://bookface-9q1u.onrender.com';

    try {
        const response = await fetch(`${API_BASE}/post/${ID}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete post");
        }

        alert("Post deleted!");
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};

const deleteGroup = async (ID) => {
    const API_BASE = location.hostname === 'localhost'
        ? 'http://localhost:5050'
        : 'https://bookface-9q1u.onrender.com';

    try {
        const response = await fetch(`${API_BASE}/groups/${ID}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete group");
        }

        alert("Group deleted!");
    } catch (error) {
        console.error("Error deleting group:", error);
    }
};

const addPost = async () => {
    const name = $("#name").value.trim();
    const desc = $("#description").value.trim();
    const imageInput = $("#image");
    const groupID = $("#groupID").value.trim();
    const groupName = groupID.replace(/\s+/g, "");  // removes all whitespace

    if (name) {
        if (desc) {
            if (imageInput.value) {
                var posted;
                const file = imageInput.files[0];
                console.log(file);

                if (file.size > 75000) {
                    alert(`Image needs to be under 75 KB in size.`);
                } else {
                    console.log("Image size is OK!");}
                    posted = true;
                
                if (posted && groupName){
                    const API_BASE = location === 'localhost'
                    ? 'http://localhost:5050'
                    : 'https://bookface-9q1u.onrender.com';
                    const base64 = await convertToBase64(imageInput.files[0]);
                    const post = {
                        name,
                        desc,
                        image: base64,
                        groupID: groupName
                    };
                    console.log(post);
                    posts = JSON.parse(localStorage.getItem('posts') || '[]');
                    posts.push(post);
                    localStorage.setItem('posts', JSON.stringify(posts));
                    fetch(`${API_BASE}/post`, {
                     method: 'POST',
                      headers: {
                     'Content-Type': 'application/json'
                    },
                        body: JSON.stringify(post)
                    })
                    .then(response => response.json())
                    .then(updatedPosts => {
                        console.log("Post saved on server:", updatedPosts);
                        alert("Post saved!");
                        fetchPosts();
                    })
                    .catch(error => {
                        console.error("Error saving post on server:", error);
                        alert("There was an error saving the post.");
                    });
                }
                else if (posted && !groupName){
                const API_BASE = location === 'localhost'
                ? 'http://localhost:5050'
                : 'https://bookface-9q1u.onrender.com';
                const post = {
                    name,
                    desc,
                    image: base64,
                    groupID: null
                };
                console.log(post);
                posts = JSON.parse(localStorage.getItem('posts') || '[]');
                posts.push(post);
                localStorage.setItem('posts', JSON.stringify(posts));
                fetch(`${API_BASE}/post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post)
                })
                .then(response => response.json())
                .then(updatedPosts => {
                    console.log("Post saved on server:", updatedPosts);
                    alert("Post saved!");
                    fetchPosts();
                })
                .catch(error => {
                    console.error("Error saving post on server:", error);
                    alert("There was an error saving the post.");
                });
                } 
            } else {           
                if (groupName){
                    const API_BASE = location === 'localhost'
                    ? 'http://localhost:5050'
                    : 'https://bookface-9q1u.onrender.com';
                    const post = {
                        name,
                        desc,
                        image: null,
                        groupID: groupName
                    };
                    console.log(post);
                    posts = JSON.parse(localStorage.getItem('posts') || '[]');
                    posts.push(post);
                    localStorage.setItem('posts', JSON.stringify(posts));
                    fetch(`${API_BASE}/post`, {
                     method: 'POST',
                      headers: {
                     'Content-Type': 'application/json'
                    },
                        body: JSON.stringify(post)
                    })
                    .then(response => response.json())
                    .then(updatedPosts => {
                        console.log("Post saved on server:", updatedPosts);
                        alert("Post saved!");
                        fetchPosts();
                    })
                    .catch(error => {
                        console.error("Error saving post on server:", error);
                        alert("There was an error saving the post.");
                    });
                } else {
                    const API_BASE = location === 'localhost'
                    ? 'http://localhost:5050'
                    : 'https://bookface-9q1u.onrender.com';
                    const post = {
                        name,
                        desc,
                        image: null,
                        groupID: null
                    };
                    console.log(post);
                    posts = JSON.parse(localStorage.getItem('posts') || '[]');
                    posts.push(post);
                    localStorage.setItem('posts', JSON.stringify(posts));
                    fetch(`${API_BASE}/post`, {
                     method: 'POST',
                      headers: {
                     'Content-Type': 'application/json'
                    },
                        body: JSON.stringify(post)
                    })
                    .then(response => response.json())
                    .then(updatedPosts => {
                        console.log("Post saved on server:", updatedPosts);
                        alert("Post saved!");
                        fetchPosts();
                    })
                    .catch(error => {
                        console.error("Error saving post on server:", error);
                        alert("There was an error saving the post.");
                    });
                }
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

const addGroup = async () => {
    const name = $("#gname").value.trim();
    const desc = $("#gdescription").value.trim();
    const imageInput = $("#gimage");

    if (name) {
        if (desc) {
            if (imageInput.value) {
                var started;
                const file = imageInput.files[0];
                console.log(file);
                const API_BASE = location === 'localhost'
                ? 'http://localhost:5050'
                : 'https://bookface-9q1u.onrender.com';
                if (file.size > 75000) {
                    alert(`Image needs to be under 75 KB in size.`);
                } else {
                    console.log("Image size is OK!");
                    started = true;
                }
                if (started){
                    const base64 = await convertToBase64(imageInput.files[0]);
                    const group = {
                        name,
                        desc,
                        members: null,
                        image: base64,
                        posts: null
                    };
                    console.log(group);
                    groups = JSON.parse(localStorage.getItem('groups') || '[]');
                    groups.push(group);
                    localStorage.setItem('groups', JSON.stringify(groups));
                    fetch(`${API_BASE}/groups`, {
                     method: 'POST',
                      headers: {
                     'Content-Type': 'application/json'
                    },
                        body: JSON.stringify(group)
                    })
                    .then(response => response.json())
                    .then(updatedGroups => {
                        console.log("Group saved on server:", updatedGroups);
                        alert("Group saved!");
                        fetchGroups();
                    })
                    .catch(error => {
                        console.error("Error saving group on server:", error);
                        alert("There was an error saving the group..");
                    });
                }
            } else {
                const API_BASE = location === 'localhost'
                ? 'http://localhost:5050'
                : 'https://bookface-9q1u.onrender.com';
                const group = {
                    name,
                    desc,
                    members: null,
                    image: null,
                    posts: null
                };
                groups = JSON.parse(localStorage.getItem('groups') || '[]');
                groups.push(group);
                localStorage.setItem('groups', JSON.stringify(groups));
                console.log(group);
                fetch(`${API_BASE}/groups`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(group)
                })
                .then(response => response.json())
                .then(updatedGroups => {
                    console.log("Group saved on server:", updatedGroups);
                    alert("Group saved!");

                    fetchGroups();
                })
                .catch(error => {
                    console.error("Error saving group on server:", error);
                    alert("There was an error saving the group.");
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
    const homeContainer = $("#homeContainer");
    const groupsContainer = $("#groupsContainer");
    const postsContainer = $("#postsContainer");
    let saves = [];
    const storedUser = JSON.parse(localStorage.getItem('User'));
    const role = storedUser?.role;
    postsContainer.innerHTML = `
    <div id="postForm" class="section">
        <h1>Write a Post</h1>
        <div>
        <label for="name">Name:</label>
        <input type="text" id="name">
        </div>
        <div>
        <input type="text" id="description" class="large_textbox" placeholder="What's on your mind?">
        </div>
        <div>
        <label for="image">Image:</label>
        <input type="file" id="image" accept="image/*">
        </div>
        <div>
        <label for="groupID">Group:</label>
        <input type="text" id="groupID">
        </div>
        <div>
        <button id="post">Post</button>
        </div>
    </div>
    `;
    document.getElementById('post').addEventListener('click', () => {
        addPost();
        $("#name").value = "";
        $("#description").value = "";
        $("#image").value = "";
        $("#groupID").value = "";
    });
    groupsContainer.innerHTML = `
    <div id="groupForm" class="section">
        <h1>Create a Group</h1>
        <div>
        <label for="gname">Name:</label>
        <input type="text" id="gname">
        </div>
        <div>
        <input type="text" id="gdescription" class="large_textbox" placeholder="What's your group about?">
        </div>
        <div>
        <label for="image">Image:</label>
        <input type="file" id="gimage" accept="image/*">
        </div>
        <div>
        <button id="groupPost">Create</button>
        </div>
    </div>
    `;
    document.getElementById('groupPost').addEventListener('click', () => {
        addGroup();
        $("#gname").value = "";
        $("#gdescription").value = "";
        $("#gimage").value = "";
    });
    saves = localStorage.getItem("savedPosts") || [];
    let joins = localStorage.getItem("joinedGroups") || [];

    groups = JSON.parse(localStorage.getItem("groups"));

    posts.slice().reverse().forEach(post => {

        const postCard = document.createElement("div");
        postCard.classList.add("post-card");
        isSaved = saves.includes(post._id);
        joined = joins.includes(post.groupID);

        // Post header (name)
        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");
        postHeader.textContent = post.name;

        // Save Button
        const saveButton = document.createElement("button");
        saveButton.textContent = isSaved ? "Saved" : "Save";
        saveButton.classList.add("toggle-button");
        
        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&times;"; // HTML entity for 'X'
        deleteButton.classList.add("delete-button");
        deleteButton.title = "Delete Post";
        
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this post?")) {
                deletePost(post._id); // Delete with confirm Button
            }
        });
        
        // Join Button
        const joinButton = document.createElement("button");
        joinButton.textContent = joined ? "Leave" : "Join";
        joinButton.classList.add("toggle-button");


        // Appending the post Header and Buttons
        if(post.groupID !== null){
            postHeader.appendChild(joinButton);
        }
        if(role === 1 || role === 2){
            postHeader.appendChild(deleteButton);
        }
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
            saves = localStorage.getItem("savedPosts") || [];

            try {
              const raw = localStorage.getItem("savedPosts");
              saves = raw && raw !== "undefined" && raw !== "null" ? JSON.parse(raw) : [];
            } catch (e) {
              saves = [];
            }

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
        joinButton.addEventListener("click", () => {
            let posted = [];
            joined = !joined;
            joinButton.textContent = joined ? "Leave" : "Join";
            joinButton.classList.toggle("joined", joined);
            
            // user = JSON.parse(localStorage.getItem("User")) || [];
            joins = localStorage.getItem("joinedGroups") || [];
            data = post.groupID;
            if(joined){
                if (!joins.includes(data)) {
                    console.log("Yes, " + data);
                    if(joins.includes("[]")){
                        joins = [data, joins];
                        console.log("Yes, " + joins);
                    } else{
                        joins = [data, joins];
                        console.log("no, " + joins);

                    }
                    console.log("updatejoin: " + joins);
                    // joins.splice(1, 0, JSON.stringify(data));
                    // updatedJoins = new Set(joins);

                } else { console.log("OH NOOOOO!!!")};
            } 
            else
            {
                
                keyword = post.groupID;
                const pattern = new RegExp(keyword, 'i'); // 'i' makes the pattern case-insensitive

                console.log(pattern + " keyword before");

                console.log(joins + " Data before");
                localStorage.setItem("joinedGroups", joins);
                // joins = localStorage.getItem("joinedGroups" , [joins]);
                // const indexToDelete = saves.findIndex(item => item._id === idToRemove);
                // if (indexToDelete !== -1) {
                //     saves.splice(indexToDelete, 1);
                // }
                // updatedJoins = new Set([joins]);
                // console.log(joins + " Data before");
                // const update = [joins].filter(item => item === keyword);
                //console.log(update + " Update before");

                if(joins.includes(keyword)){
                     let updatedJoins = joins.split(",");
                     let update = [];
                     updatedJoins.forEach(item => {
                        if (item.toLowerCase().includes(keyword.toLowerCase())) {
                          console.log(`Match found: ${item}`);
                        } else {
                            update.push(item);
                            console.log(`No match: ${item}`);

                        }
                      });
                      
                    //   console.log(update); 

                    // updatedJoins = localStorage.getItem("joinedGroups") || [];
                    joins = update;
                
                console.log(update + " update after");
                // if(!update){
                // joins = [keyword, joins];
                // } else{
                //     joins = update;
                // }
                }
                console.log(joins + " Data after");
                }
    
                localStorage.setItem('joinedGroups', joins);
                updateJoins(joins);
                });
        postsContainer.appendChild(postCard);

    });

    homeContainer.appendChild(postsContainer);
    // Create the break line
    const spacer = document.createElement("div");
    spacer.style.height = "20px"; 

    // Create the header
    const header = document.createElement("h1");
    header.textContent = "Groups";

    // Append the header and break line before the postCard

    groups.slice().reverse().forEach(group => {
        joins = localStorage.getItem("joinedGroups") || [];
        let updatedJoins = [new Set(joins)];
        console.log(updatedJoins);
        const groupCard = document.createElement("div");
        groupCard.classList.add("post-card");
        let str = group.name;
        let name = str.replace(/\s/g, '');
        joined = joins.includes(name);
        console.log(joined + updatedJoins);
           // Post header (name)
        const groupHeader = document.createElement("div");
        groupHeader.classList.add("post-header");
        groupHeader.textContent = group.name;
           // Add image
        if (group.image !== null) {
            const groupImage = document.createElement("img");
            groupImage.src = group.image;
            groupImage.alt = "Post Image";
            groupCard.appendChild(groupImage);          
        }    

        // Join Button
        const joinedButton = document.createElement("button");
        joinedButton.textContent = joined ? "Leave" : "Join";
        joinedButton.classList.add("toggle-button");
        groupHeader.appendChild(joinedButton);

        // Description
        const groupDesc = document.createElement("p");
        groupDesc.classList.add("post-description");
        // groupHeader.appendChild(groupDesc);

        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&times;"; // HTML entity for 'X'
        deleteButton.classList.add("delete-button");
        deleteButton.title = "Delete Group";

        // Check for user role as admin/moderator
        if(role === 1 || role === 2) {
            groupHeader.appendChild(deleteButton);
        }

        groupCard.appendChild(groupHeader);
        
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this group?")) {
                deleteGroup(group._id); // Delete with confirm Button
            }
        });

        joinedButton.addEventListener("click", () => {
            let posted = [];
            joined = !joined;
            const keyword = group.name.replace(/\s/g, '');
            joinedButton.textContent = joined ? "Leave" : "Join";
            joinedButton.classList.toggle("joined", joined);
            joins = localStorage.getItem("joinedGroups") || [];
            let updatedJoins = joins.split(",");
            let update = [];
            data = keyword;
            if(joined){
                if (!joins.includes(data)) {
                    updatedJoins = joins.split(",");
                    updatedJoins.forEach(item => {
                        if (item.toLowerCase().includes(keyword.toLowerCase())) {
                            console.log(`Match found: ${item}`);
                        } else {
                            update.push(item);
                            console.log(`No match: ${item}`);
    
                        }
                    });
                    joins = update;

                    if(joins.includes("[]")){
                        joins = [data, joins];
                        console.log("Yes, " + joins);
                    } else{
                        joins = [data, joins];
                        console.log("no, " + joins);
    
                    }
                    console.log("updatejoin: " + joins);
                    // joins.splice(1, 0, JSON.stringify(data));
                    // updatedJoins = new Set(joins);
    
                    } else { console.log("OH NOOOOO!!!")};
                
            } 
            else
            {
       
                let keyword = group.name.replace(/\s/g, '');
                const pattern = new RegExp(keyword, 'i'); // 'i' makes the pattern case-insensitive
    
                console.log(pattern + " keyword before");
    
                console.log(joins + " Data before");
                localStorage.setItem("joinedGroups", joins);
                    // joins = localStorage.getItem("joinedGroups" , [joins]);
                    // const indexToDelete = saves.findIndex(item => item._id === idToRemove);
                    // if (indexToDelete !== -1) {
                    //     saves.splice(indexToDelete, 1);
                    // }
                // updatedJoins = new Set([joins]);
                    // console.log(joins + " Data before");
                    // const update = [joins].filter(item => item === keyword);
                    //console.log(update + " Update before");
    
                if(joins.includes(keyword)){
                        let updatedJoins = joins.split(",");
                        let update = [];
                        updatedJoins.forEach(item => {
                        if (item.toLowerCase().includes(keyword.toLowerCase())) {
                            console.log(`Match found: ${item}`);
                        } else {
                            update.push(item);
                            console.log(`No match: ${item}`);
    
                        }
                        });
                          
                        //   console.log(update); 
    
                        // updatedJoins = localStorage.getItem("joinedGroups") || [];
                        joins = update;
                    
                    console.log(update + " update after");
                    // if(!update){
                    // joins = [keyword, joins];
                    // } else{
                    //     joins = update;
                    // }
                    }
                    console.log(joins + " Data after");
                    }
        
                    localStorage.setItem('joinedGroups', joins);
                    updateJoins(joins);
        });

    localStorage.setItem('joinedGroups', joins);
    groupsContainer.appendChild(groupCard);
    });
    homeContainer.appendChild(groupsContainer);

}

function queryGroup(id) {
    const API_BASE = location === 'localhost'
    ? 'http://localhost:5050'
    : 'https://bookface-9q1u.onrender.com';
    fetch(`${API_BASE}/groups/${id}`)
    .then(response => response.json())
    .then(fetchedUser => {
        // Update the posts array with the fetched data
        const user = fetchedUser;
        const savedPosts = JSON.stringify(user.saved);
        localStorage.setItem('savedPosts', savedPosts);
    })
    .catch(error => console.error("Error fetching users:", error));
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
document.addEventListener("DOMContentLoaded", fetchGroups);
document.addEventListener("DOMContentLoaded", fetchSaves);




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
