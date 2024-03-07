const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// In-memory data for demonstration purposes (replace with a database in a real application)
const tasks = [];
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    // Check if the user is authenticated, otherwise redirect to the login page
    if (!req.session || !req.session.isAuthenticated) {
        return res.redirect('/login');
    }

    // Display the To-Do app
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Basic authentication logic (replace with a more secure solution in production)
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        req.session.isAuthenticated = true;
        return res.redirect('/');
    } else {
        res.send('Login failed. Check your username and password.');
    }
});

