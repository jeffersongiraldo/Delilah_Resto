const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

async function validation(userFound, userCredentials) {
    if (!userFound || userFound == null) return res.status(400).json({error: true, msg: "Invalid Credentials "});

    //Validacion de contraseña
    const validPassword = await bcrypt.compare(userCredentials.password, userFound.password);
    if (!validPassword) return res.status(400).json({error: error, msg: "Invalid Credentials"});
    return true;
}

function validateEmail(email) {
    re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!re.exec(email))  return false;
    return true;
}

const validateLogin = async (req, res, next) => {

    const userCredentials = req.body;
    if(req.body.hasOwnProperty("username")) {
        const username = req.body.username;
        console.log(username)
        if (username.length < 6) return res.status(401).json({error: true, msg: `Username must have at least 6 caractheres.`})
        
        //Validacion de usuario en Base de datos
        const userFound = await userModel.findOne({
            where: {username: userCredentials.username}
        })
        
        const validated = validation(userFound, userCredentials);
        if(validated) return next();
    }

    if(req.body.hasOwnProperty("email")) {
        const email = req.body.email;
        console.log(email)
        if (email.length < 10) return res.status(401).json({error: true, msg: `Email must have at least 10 caractheres.`})
        const emailValidated1 = validateEmail(email);
        if(emailValidated1) {
            //Validacion de usuario en Base de datos
            const userFound = await userModel.findOne({
                where: {email: userCredentials.email}
            })
            
            const validated = validation(userFound, userCredentials);
            if(validated) return next();
        } 
        return res.status(404).json({error: true, msg: `Invalid Credentials`})
    }

}

module.exports = validateLogin;



