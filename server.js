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
// Helper function to set the beacon
function setBeacon(bulletinMessage, increment) {
    let str1 = bulletinMessage.slice(0, 16);
    let str2 = bulletinMessage.slice(16, 32);
    let str3 = bulletinMessage.slice(32, 48);
    let str4 = bulletinMessage.slice(48, 64);
    incrementVal = increment;
    object["message"] = str1 + str3 + str2 + str4;

    for (let i = 0; i < increment; i++) {
        object["led" + i] = { red: 0, green: 0, blue: 100 };
    }

    for (let i = increment; i < 60; i++) {
        object["led" + i] = { red: 0, green: 100, blue: 0 };
    }
}

// GET route for beacon
app.get('/beacon', (req, res) => {
    setBeacon(
        "project, and user community that designs and manufactures single-board microcontrollers" +
        " and microcontroller kits for building digital devices. Its hardware products are licensed under a CC " +
        "BY-SA license, while the software is licensed under the GNU Lesser General Public License " +
        "(LGPL) or the GNU General Public License (GPL),[1] " +
        "permitting the manufacture of Arduino boards and software distribution by anyone.",
        32
    );
    res.json(object);
});

// POST route for updating the message
app.post('/beacon/message', (req, res) => {
    const receivedObject = req.body; // Parse JSON object from the request body

    // Validate received object
    if (!receivedObject || typeof receivedObject.message !== 'string') {
        return res.status(400).json({ error: "Invalid or missing 'message' in the request body." });
    }



    res.json({
        message: "JSON object received successfully.",
        receivedObject,
    });

    console.log('Received message:', receivedObject.message);
    setBeacon(receivedObject["message"], incrementVal)
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
