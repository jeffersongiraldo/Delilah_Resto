const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// Import doc config.js
const config = require('./src/config/config');

//Import the routes


const port = config.port;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})