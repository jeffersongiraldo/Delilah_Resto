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
const newOrder = require('./src/routes/newOrder.route');
const products = require('./src/routes/products.route');
const myOrders = require('./src/routes/myOrders.route');
const admin = require('./src/routes/admin.route');

// Paths
app.use('/DelilahResto/register', validateRegister, register);
app.use('/DelilahResto/account/login', validateLogin, login);
app.use('/DelilahResto/account/myinfo', account);
app.use('/DelilahResto/account/newOrder', authToken, newOrder);
app.use('/DelilahResto/products', authToken, products);
app.use('/DelilahResto/account/myOrders', myOrders)
app.use('/DelilahResto/admin', authAdmin, admin);

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})