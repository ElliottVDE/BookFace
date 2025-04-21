"use strict";
function authenticateEmail(email){
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    
    if(!emailPattern.test(email)){
        document.getElementById("emailError").textContent = "Please enter a valid email";
        return false;
    }
    
    document.getElementById("emailError").textContent = "";
    return true;

}
function authenticateName(name){
    const namePattern = /^[A-Za-zÀ-ÿ\s._%+-]+$/;
    
    if(!namePattern.test(name)){
        document.getElementById("nameError").textContent = "Please enter a valid name";
        return false;
    }
    
    document.getElementById("emailError").textContent = "";
    return true;

}
function authenticatePass(password, repassword){
    //Min 8 characters, one uppercase, one number, allows any special character
    const passPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;\"'|\\<>,.?/~`-]{8,}$/;

    if (!passPattern.test(password)){
        document.getElementById("passwordError").textContent = "Please enter a valid password (With 8 Characters, 1 Uppercase, 1 number, Special Characters allowed)";
        return false;
    }
    
    if (password !== repassword) {
        document.getElementById("repassError").textContent = "";
        document.getElementById("repassError").textContent = "Make sure each password matches";
        return false;
    }

    document.getElementById("repassError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    return true;

}

async function authenticateUserName(username){
    //No special characters
    const userPattern = /^[A-Za-z0-9+-]+$/;
    const API_BASE = location.hostname === 'localhost'
    ? 'http://127.0.0.1:5050'
    : 'https://bookface-9q1u.onrender.com';

    if (!userPattern.test(username)){
        document.getElementById("userError").textContent = "Please enter a valid username (No spaces or special characters)";
        return false;
    } 

    try {
        const response = await fetch(`${API_BASE}/user/${username}`);
        
        // Check if the response is not OK (e.g., status 404, 500, etc.)
        if (!response.ok) {
            const errorText = await response.text(); // Get raw text (e.g., "Not Found")
            document.getElementById("userError").textContent = errorText;
            // Handle error cases based on status
            if (response.status === 404) {
                document.getElementById("userError").textContent = "Username not found.";
            } else {
                document.getElementById("userError").textContent = "An error occurred while checking the username.";
            }
            return false;
        }
        
        // If the response is OK, check the content type before parsing as JSON
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
            // Parse JSON only if the response is JSON
            const data = await response.json(); 
    
            // If data is empty or does not contain the expected properties, handle as not found
            if (data.message == "Username is available") {
                document.getElementById("userError").textContent = "";
                return true;
            }
    
            // If the data is valid, clear any error message
            document.getElementById("userError").textContent = "";
            return true;
        } else {
            // If the response isn't JSON, handle the plain text response
            const text = await response.text();
            console.error('Response is not JSON:', text);
            document.getElementById("userError").textContent = "";
            return true;
        }
    
    } catch (err) {
        console.error("Error checking username:", err);
        document.getElementById("userError").textContent = "Unable to validate username right now.";
        return false;
    }
}     // document.getElementById("userError").textContent = "";
    // return true;
    // document.getElementById("userErroer").textContent = "";
    // return true;



$(document).ready( () => {

    const validateAccount = async () => {

        let username = $("#uname").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let rePassword = $("#repassword").val();
        let name =  $("#name").val();
        let savedPosts = null;

        let emailValid = authenticateEmail(email);
        let nameValid = authenticateName(name);
        let passValid = authenticatePass(password, rePassword);

        let userValid = await authenticateUserName(username);
        console.log("Validation Results:", { userValid, passValid, emailValid, nameValid });
        if(userValid && passValid && emailValid && nameValid){
            const user = {
            username: username,
            password: password,
            email: email,
            name: name,
            location: "New York, USA",
            about: "Description...",
            picture: null,
            saved: savedPosts,
            groups: null
            };
            console.log(user.name);

            const API_BASE = location.hostname === 'localhost'
            ? 'http://127.0.0.1/:5050'
            : 'https://bookface-9q1u.onrender.com';
            
            fetch(`${API_BASE}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user.username , password: user.password, email: user.email, name: user.name, 
                    location: user.location , about: user.about, picture: user.picture, saved:user.saved, groups:user.groups
                 })
            })
            .then(response => {
                if (!response.ok) {
                    // Server responded with an error status
                    throw new Error("Server responded with status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log("User saved successfully:", data);
                // ✅ Only redirect on success
                location.assign("../index.html");
            })
            .catch(error => {
                console.error("Error saving user on server:", error);
                alert("There was an error saving the user. Please try again.");
            });
        }

    }

    $("#submit").on("click", async (evt) => {
        evt.preventDefault(); // ✅ Always prevent default behavior
    
        await validateAccount(); // ✅ Wait for validation and possible fetch

        // ✅ Form is valid — fetch is triggered inside validateAccount()
    });

    
});


//For unit tests
/*
module.exports = {
    authenticateEmail,
    authenticatePass,
    authenticateUserName
}
*/