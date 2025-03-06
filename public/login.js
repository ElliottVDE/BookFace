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

const logIn = () => {
    //TODO: Implement for log-ins in db when SQL is implemented
    //const u1 = "admin";
    //const u2 = "teacherman";
    //const p1 = "admin";
    //const p2 = "password";

    let verified = false;
    let x = $("#username").val();
    let y = $("#password").val();
  
    if (x.trim() === "" || y.trim() === "") {
      document.getElementById("usernameError").textContent = "Please enter a username and password"
      document.getElementById("passwordError").textContent = "Please enter a username and password"
    return;
      
    }
    users.forEach(user => {

      if(x === user.username && y === user.password){
        localStorage.setItem('loggedIn', 'true');
        verified = true;
        location.assign("Home/index.html");
        document.getElementById("usernameError").textContent = "";
        document.getElementById("passwordError").textContent = "";
        $("#username").val("");
        $("#password").val("");
      };
    });
      if(verified === false) {
        alert("Username or password incorrect.");
      };

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