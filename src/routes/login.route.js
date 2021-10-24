const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Import the User model
const userModel = require('../models/user.model');

// Connection to the DataBase
const connection = require('../database/connection');

// Import the function of Login
const findUser = require('../utils/login.function');

// Login
const login = router.post('/', async(req, res) => {
    
    const userFound = await findUser(req.body);
    

    //Creacion del Token
    const token = jwt.sign({
        username: userFound.username,
        user_id: userFound.user_id,
        isAdmin: userFound.isAdmin,
        adminCode: userFound.adminCode
    }, config.tokenSecret)

    //Ingreso valido
    headers = {
        'Authorization': token
    }
    res.header(headers).json({
        error:null,
        data: token,
        msg: `Welcome to Delilah Resto ${userFound.fullname}`
    })
})

module.exports = login;