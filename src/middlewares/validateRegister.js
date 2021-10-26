const userModel = require('../models/user.model');

// Email syntax Validation
function validateEmail(email) {
    re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (re.exec(email))  return true;
    return false;
}

const validateRegister = async (req, res, next) => {
    const infoUser = req.body;
    const emailValidated = validateEmail(infoUser.email);
    if(!emailValidated) {
        return res.status(401).json({error: true, msg: `You must put a correct email.`})
    } else {
        //Validate that the email would be unique
        const emailIsNotUnique = await userModel.findOne({where: {email: infoUser.email}})
        if(emailIsNotUnique) return res.status(409).json({error: true, msg: `This email have already been registered`});
        
        //Validate that the username would be unique
        const usernameIsNotUnique = await userModel.findOne({where: {username: infoUser.username}})
        if(usernameIsNotUnique) return res.status(409).json({error: true, msg: `This username have already been registered`});
        
        return next()
    }
}

module.exports = validateRegister;