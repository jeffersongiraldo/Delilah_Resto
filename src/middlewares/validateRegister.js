
const userModel = require('../models/user.model');

// Schema register
const schemaRegister = Joi.object({
    user_id: Joi.number(),
    username: Joi.string().min(6).max(99).required(),
    fullname: Joi.string().min(6).max(250),
    email: Joi.string().min(10).max(255).email(),
    cellphone: Joi.string(),
    delivery_address: Joi.string().min(6).max(255),
    password: Joi.string().min(8).max(1024).required(),
    isAdmin: Joi.string().min(4).max(5),
    adminCode: Joi.string().min(4).max(250),
    isDisable: Joi.string().min(4).max(5)
})

const validateRegister = async (req, res, next) => {

    const { error } = schemaRegister.validate(req.body)
    if (error) {
        return res.status(400).json(
        {error: error.details[0].message}
        )
    }
    
    const email = req.body.email;
    userModel.findOne({email: email})
    .then(obj => {
        if(obj.email === email) return res.status(409).json({error: true, msg: `This email already have been registered ${obj.email}`})
        next();
    })
    .catch(err => {
        return res.json({err: true, msg: 'There is an error with the function ' + err})
    })
}

module.exports = validateRegister;