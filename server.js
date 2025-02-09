const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Global object
let object = {};


// GET route for beacon
app.get('/beacon', (req, res) => {
    res.json(object);
});

// POST route for updating the message
app.post('/beacon/message', (req, res) => {
    const receivedObject = req.body; // Parse JSON object from the request body

    res.json({
        message: "JSON object received successfully.",
        receivedObject
    });

    console.log('Received message:', receivedObject);
    object = receivedObject
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
