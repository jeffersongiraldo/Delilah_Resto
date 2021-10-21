const userModel = require('../models/user.model');


function validateEmail(email) {
    re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (re.exec(email))  return true;
    return false;
}

const validateRegister = async (req, res, next) => {
    const infoUser = req.body;
    const emailValidated = validateEmail(infoUser.email)
    console.log(`This is the emailValidated ${emailValidated}`)
    console.log('Null + null es igual a ' + null && null)
    if(!emailValidated) {
        return res.status(401).json({error: true, msg: `You must put a correct email.`})
    } else {
        const emailIsNotUnique = await userModel.findOne({where: {email: infoUser.email}})
        if(emailIsNotUnique) return res.status(409).json({error: true, msg: `This email have already been registered`});
        const usernameIsNotUnique = await userModel.findOne({where: {username: infoUser.username}})
        console.log(`This is the usernameValidation ${usernameIsNotUnique}`)
        if(usernameIsNotUnique) return res.status(409).json({error: true, msg: `This username have already been registered`});
        return next()
    }
}

module.exports = validateRegister;