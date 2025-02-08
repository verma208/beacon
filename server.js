const express = require('express');
const app = express();
const port = process.env.PORT || 3001;


let beaconOn = false;

app.get('/beacon', (request, response) => {
    response.json({ message: 'Hello from the server!',
                        beaconOn: beaconOn });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});