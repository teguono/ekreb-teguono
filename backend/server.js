// Importing required modules
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Initializing the Express application
const app = express();

// Enabling CORS for frontend running on localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Function to scramble a given word
function scrambleWord(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

// Endpoint to fetch a random word and return its scrambled version
app.get('/word', async (req, res) => {
    try {
        // Fetching a random word from the API
        const response = await axios.get('https://random-word-api.herokuapp.com/word'); 
        const word = response.data[0];
        const scrambled = scrambleWord(word);
        
        // Sending the scrambled word and its original form as a response
        res.json({ scrambled: scrambled, original: word });
    } catch (error) {
        // Logging and sending an error response in case of an issue
        console.error('Error fetching word from API:', error);
        res.status(500).send('Error fetching word');
    }
});

// Endpoint to validate if the user's guess is correct
app.post('/guess', (req, res) => {
    const { guess, original } = req.body;

    console.log("Received guess:", guess);
    console.log("Expected original:", original);

    // Comparing the user's guess with the original word and sending a response accordingly
    if (guess === original) {
        res.json({ correct: true });
    } else {
        res.json({ correct: false });
    }
});

// Defining the port and starting the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
