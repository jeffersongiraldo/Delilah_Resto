const router = require('express').Router();
const bcrypt = require('bcrypt');

// Import the User model
const userModel = require('../models/user.model');

// Connection to the DataBase
const connection = require('../database/connection');


// Register
const register = router.post('/register', async(req, res) => {
    console.log(req.body.adminCode)
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)
    const adminCode = (req.body.adminCode ==  undefined || req.body.adminCode == null || req.body.adminCode == "") 
                        ? null
                        : await bcrypt.hash(req.body.adminCode, salt)
    

    const userData = {
        user_id: req.body.user_id,
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        cellphone: req.body.cellphone,
        delivery_address: req.body.delivery_address,
        password: password,
        isAdmin: req.body.isAdmin,
        adminCode: adminCode,
        isDisable: req.body.isDisable
    }
    try {
        const savedUser = await userModel.create(userData);
        res.json({
            error: null,
            data: savedUser
        })
    } catch (err) {
        res.status(400).json({error: err})
    }
    
    
}) 

module.exports = register;