"use strict";
let users = [];


const fetchUsers = () => {
  const API_BASE = location === 'localhost'
  ? 'http://localhost:5050'
  : 'https://bookface-9q1u.onrender.com';

  fetch(`${API_BASE}/user`)
  .then(response => response.json())
  .then(fetchedUsers => {
      // Update the posts array with the fetched data
      users = fetchedUsers;

      
  })
  .catch(error => console.error("Error fetching users:", error));
};

const logIn = () => {
  let verified = false;
  let x = $("#username").val();
  let y = $("#password").val();
    
  if (x.trim() === "" || y.trim() === "") {
    document.getElementById("usernameError").textContent = "Please enter a username and password"
    document.getElementById("passwordError").textContent = "Please enter a username and password"
  return;
  }
  const API_BASE = location.hostname === 'localhost'
    ? 'http://127.0.0.1:5050'
    : 'https://bookface-9q1u.onrender.com';
  fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: x.trim(), password: y.trim() })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // Login success
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', x.trim());
      location.assign("Home/index.html");
    } else {
      // Login failed
      alert(data.message || "Username or password incorrect.");
    }
  })
  .catch(err => {
    console.error("Login error:", err);
    alert("Something went wrong. Try again.");
  });

  

    // users.forEach(user => {
    //   if(x.trim() === user.username && y.trim() === user.password){
    //     localStorage.setItem('loggedIn', 'true');
    //     localStorage.setItem('username', user.username)
    //     verified = true;
    //     location.assign("Home/index.html");
    //     document.getElementById("usernameError").textContent = "";
    //     document.getElementById("passwordError").textContent = "";
    //     $("#username").val("");
    //     $("#password").val("");
    //   };
    // });
    //   if(verified === false) {
    //     alert("Username or password incorrect.");
    //   };

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