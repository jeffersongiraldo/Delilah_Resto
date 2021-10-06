const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');


//Schema Login
const schemaLogin = Joi.object({
    username: Joi.string().min(6).max(99).required(),
    password: Joi.string().min(8).max(1024).required()
})

const validateLogin = async (req, res, next) => {
    
    // Validacion Schema
    const {error} = schemaLogin.validate(req.body);
    if (error) return res.status(404).json({err: error.details[0].message})
    
    const userCredentials = req.body;

    //Validacion de usuario en Base de datos
    const userFound = await userModel.findOne({
        where: {username: userCredentials.username}
    })
    if (userFound.username !== userCredentials.username) return res.status(400).json({error: true, msg: "Invalid Credentials "});

    //Validacion de contraseña
    const validPassword = await bcrypt.compare(userCredentials.password, userFound.password);
    if (!validPassword) return res.status(400).json({error: error, msg: "Invalid Credentials"});
    next();
}

module.exports = validateLogin;



