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
  fetch(`${API_BASE}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: x.trim(), password: y.trim() })
  })
  .then(res => res.json())
  .then(data => {
    if (data.user) {
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
  }

  document.addEventListener("DOMContentLoaded", fetchUsers);
  $(document).ready(() => {
    $("#login").submit(evt => {
      evt.preventDefault(); // Prevent the default form submission behavior
      
      logIn();
    });
  });