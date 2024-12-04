"use strict";
let users = [];

const fetchUsers = () => {
  fetch('/data/users.json')
  .then(response => response.json())
  .then(fetchedUsers => {
      // Update the posts array with the fetched data
      users = fetchedUsers;
  })
  .catch(error => console.error("Error fetching users:", error));
};

const logIn = async () => {
    //TODO: Implement for log-ins in db when SQL is implemented
    //const u1 = "admin";
    //const u2 = "teacherman";
    //const p1 = "admin";
    //const p2 = "password";

    let verified = false;
    let username = $("#username").val();
    let password = $("#password").val();
  
    if (username.trim() === "" || password.trim() === "") {
      document.getElementById("usernameError").textContent = "Please enter a username and password"
      document.getElementById("passwordError").textContent = "Please enter a username and password"
    return;
      
    }

    // users.forEach(user => {

    //   if(x === user.username && y === user.password){
    //     localStorage.setItem('loggedIn', 'true');
    //     verified = true;
    //     location.assign("Home/index.html");
    //     document.getElementById("usernameError").textContent = "";
    //     document.getElementById("passwordError").textContent = "";
    //     $("#username").val("");
    //     $("#password").val("");
    //   };
    // });
    //   if(verified === false) {
    //     document.getElementById("password").value = "";
    //     alert("Username or password incorrect.");
    //   };
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
      });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('loggedIn', 'true');
      location.assign("Home/index.html");
    } else {
      alert(data.error);  // Show error message
      document.getElementById("password").value = "";
    }
    // if (x === u1 && y === p1) {
    //   localStorage.setItem('loggedIn', 'true');
    //   localStorage.setItem("username",u1);
    //   localStorage.setItem("password",p1);
    //   location.assign("../Home/index.html");
    //   document.getElementById("usernameError").textContent = "";
    //   document.getElementById("passwordError").textContent = "";
    //   $("#username").val("");
    //   $("#password").val("");
    // } else if (x ===u2 && y ===p2) {
    //   localStorage.setItem('loggedIn', 'true');
    //   localStorage.setItem("username",u2);
    //   localStorage.setItem("password",p2);
    //   location.assign('../Home/index.html');
    //   document.getElementById("usernameError").textContent = "";
    //   document.getElementById("passwordError").textContent = "";
    //   $("#username").val("");
    //   $("#password").val("");
    // } else{
    //   alert("Username or password incorrect.");
    // }
  }

  document.addEventListener("DOMContentLoaded", fetchUsers);
  $(document).ready(() => {
    $("#login").submit(evt => {
      evt.preventDefault(); // Prevent the default form submission behavior
      logIn();
    });
  });