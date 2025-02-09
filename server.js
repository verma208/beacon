const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Global object
let object = {};
let incrementVal = 0;
let message = ""
let RGB1 = {red: 0, blue: 0, green: 0}
let RGB2 = {red: 0, blue: 0, green: 0}
// Helper function to set the beacon
function setBeacon(bulletinMessage, increment) {
    let str1 = bulletinMessage.slice(0, 16);
    let str2 = bulletinMessage.slice(16, 32);
    let str3 = bulletinMessage.slice(32, 48);
    let str4 = bulletinMessage.slice(48, 64);


    for (let i = 0; i < increment; i++) {
        object["led" + i] = {red: RGB1.red, green: RGB1.green, blue: RGB1.blue};
    }

    for (let i = increment; i < 60; i++) {
        object["led" + i] = {red: RGB2.red, green: RGB2.green, blue: RGB2.blue};
    }

    object.message = str1 + str3 + str2 + str4
}

// GET route for beacon
app.get('/beacon', (req, res) => {
    setBeacon(message, incrementVal)
    res.json(object);
});

// POST route for updating the message
app.post('/beacon/message', (req, res) => {
    const receivedObject = req.body; // Parse JSON object from the request body

    res.json({
        message: "JSON object received successfully.",
        receivedObject
    });

    console.log('Received message:', receivedObject.message);
    message = receivedObject.message
});


app.post('/beacon/increment', (req, res) => {
    const receivedObject = req.body; // Parse JSON object from the request body


    res.json({
        message: "JSON object received successfully.",
        receivedObject
    });

    console.log('Received message:', receivedObject["increment"]);
    incrementVal = receivedObject["increment"]
});

app.post('/beacon/RGB', (req, res) => {
    const receivedObject = req.body; // Parse JSON object from the request body


    res.json({
        message: "JSON object received successfully.",
        receivedObject
    });

    console.log('Received message:', receivedObject["increment"]);
    RBG1 = receivedObject["first"]
    RBG1 = receivedObject["second"]
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
