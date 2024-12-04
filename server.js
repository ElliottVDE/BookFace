const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const fsPromises = require('fs').promises;
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



app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Read users data from the file (simulating a database)
        const data = await fsPromises.readFile('data/users.json', 'utf8');
        const users = JSON.parse(data);
        // Find the user by username
        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(404).json({ error: 'Username or password incorrect.' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Username or password incorrect.' });
        }

        // If the login is successful, send a success response
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to add a user
app.post('/api/users', async (req, res) => {
    try {
        
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }

        // Hash the password before storing it in the "database"
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        newUser.password = hashedPassword;

        const data = await fsPromises.readFile('data/users.json', 'utf8');
        let users = JSON.parse(data);
        users.push(newUser);

        await fsPromises.writeFile('data/users.json', JSON.stringify(users, null, 2), 'utf8');

        res.status(201).json({ message: 'User created successfully' });
    } catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
