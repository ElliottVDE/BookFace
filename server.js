const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000; // Change as needed

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Serve static files (like images, CSS, JS) if needed
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Endpoint to get posts
app.get('/data/posts.json', (req, res) => {
    fs.readFile('data/posts.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send("Error reading posts file.");
        }
        res.json(JSON.parse(data));
    });
});

/*
// Detect first-time users and redirect to the welcome page
document.addEventListener("DOMContentLoaded", () => {
    // Check if the user is a first-time visitor
    if (!localStorage.getItem('firstTimeUser')) {
        // Redirect to the Welcome Page
        window.location.href = './welcome.html';
        // Mark the user as visited
        localStorage.setItem('firstTimeUser', 'false');
    }
});
*/


// Endpoint to add a post
app.post('/api/posts', (req, res) => {
    const newPost = req.body;
    fs.readFile('data/posts.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send("Error reading posts file.");
        }

        const posts = JSON.parse(data);
        posts.push(newPost);

        fs.writeFile('data/posts.json', JSON.stringify(posts, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send("Error saving post.");
            }
            res.json(posts); // Return the updated posts list
        });
    });
});

// Endpoint to get users
app.get('/data/users.json', (req, res) => {
    fs.readFile('data/users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send("Error reading users file.");
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to add a post
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    fs.readFile('data/users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send("Error reading posts file.");
        }

        const users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile('data/users.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send("Error saving user.");
            }
            //res.json(users); // Return the updated posts list
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
