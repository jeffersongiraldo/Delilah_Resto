const router = require('express').Router();
const bcrypt = require('bcrypt');

// Import the User model
const userModel = require('../models/user.model');

// Connection to the DataBase
const connection = require('../database/connection');


// Register
const register = router.post('/', async(req, res) => {

    //Encrypting the password of the user
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)

    //If the user has the admin role, the adminCode is encrypted. 
    const adminCode = (req.body.adminCode !==  undefined) 
                        ? await bcrypt.hash(req.body.adminCode, salt)
                        : null

    const userData = {
        user_id: req.body.user_id,
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        cellphone: req.body.cellphone,
        deliveryAddress: req.body.deliveryAddress,
        password: password,
        isAdmin: req.body.isAdmin,
        adminCode: adminCode,
        isDisable: req.body.isDisable
    }
    try {
        const savedUser = await userModel.create(userData);
        res.json({
            error: null,
            data: {
                username: savedUser.username,
                email: savedUser.email,
                cellphone: savedUser.cellphone,
                deliveryAddress: savedUser.deliveryAddress
            }
        })
    } catch (err) {
        res.status(400).json({error: err})
    }
    
    
}) 

module.exports = register;