const router = require('express').Router();
const jwt_decode = require('jwt-decode');
const userModel = require('../models/user.model');

const getInfo = router.get('/myInfo', async(req, res) => {
    const token = req.headers.authorization;
    const tokenDecoded = jwt_decode(token);
    await userModel.findOne({
        where: {user_id: parseInt(tokenDecoded.user_id)}
    })
    .then(userFound => {
        if(userFound) return res.status(202).json({ user_id: userFound.user_id, username: userFound.username, email: userFound.email, delivery_address: userFound.delivery_address,cellphone:userFound.cellphone, isAdmin: userFound.isAdmin})
        res.status(404).json({error: true, msg: "Information Not Found", data: userFound});
    })
    .catch(err => {
        res.status(400).json({error: true, msg: `THIS IS THE ERROR: ${err}`})
    })
})

module.exports = getInfo;