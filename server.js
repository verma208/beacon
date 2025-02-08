const express = require('express');
const app = express();
const port = process.env.PORT || 3001;


let beaconOn = false;

let object = { message: 'Hello from the server!',
    red: 0,
    green: 0,
    blue: 0}


app.get('/beacon', (request, response) => {
    response.json( object );
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});