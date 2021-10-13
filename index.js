const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Import doc config.js
const config = require('./src/config/config');

const port = config.port;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Import middlewares and validations
const validateRegister = require('./src/middlewares/validateRegister');
const validateLogin = require('./src/middlewares/validateLogin');
const authToken = require('./src/middlewares/authenticate');
const authAdmin = require('./src/middlewares/authAdmin');

//Import the routes
const register = require('./src/routes/register.route');
const login = require('./src/routes/login.route');
const account = require('./src/routes/account.route')
const newOrder = require('./src/routes/order.route');
const productsRoute = require('./src/routes/products.route');

// Paths
app.use('/DelilahResto/account', validateRegister, register);
app.use('/DelilahResto/account', validateLogin, login);
app.use('/DelilahResto', authToken, account);
app.use('/DelilahResto', authToken, newOrder);
app.use('/DelilahResto', authToken, productsRoute);

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})