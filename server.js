const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

let object = {}

function setBeacon(bulletinMessage, increment){
    object["message"] = bulletinMessage

    for(let i = 0; i < increment; i++){
        object["led" + i] = {red: 0, green: 0, blue: 100}
    }

    for(let i = increment; i < 60; i++){
        object["led" + i] = {red: 0, green: 100, blue: 0}
    }
}










app.get('/beacon', (request, response) => {
    setBeacon("brug", 32)
    response.json( object );
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});