const router = require('express').Router();
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

router
    //Endpoints for the account/myInfo route
    .get('/', async(req, res) => {
        const token = req.headers.authorization;
        const tokenDecoded = jwt_decode(token);
        await userModel.findOne({
            where: {user_id: parseInt(tokenDecoded.user_id)}
        })
            .then(userFound => {
                if(userFound) return res.status(202).json({ msg: "Accepted", user_id: userFound.user_id, username: userFound.username, fullname: userFound.fullname, email: userFound.email, deliveryAddress: userFound.deliveryAddress,cellphone: userFound.cellphone})
                return res.status(404).json({error: true, msg: "It was not possible to found the info of the user"});
            })
            .catch(err => {
                return res.status(400).json({error: true, msg: `ERROR in the process of founding the user account ${err}`})
            })
    })

    .put('/', async(req, res) => {
        const newInfo = req.body;
        const token = req.headers.authorization;
        const tokenDecoded = jwt_decode(token);
        const user_id = parseInt(tokenDecoded.user_id)
        await userModel.update(newInfo, {
                where: {user_id: user_id}
            })
            .then((result) => {
                if (result == 1) {

                    //Validate if the user go to update the password to encrypted before to send to the database
                    if (newInfo.hasOwnProperty("password")) {
                        async function updatePassword(obj) {
                            const salt = await bcrypt.genSalt(10);
                            const password = await bcrypt.hash(obj.password, salt)
                            const passEncripted = {password: password}
                            await userModel.update(passEncripted, {
                                where: {user_id: user_id}
                            })
                            .then(result => {
                                return res.status(202).json({msg: 'Password was updated successfully!'})
                            })
                        }
                        const passwrodUpdated = updatePassword(newInfo)
                        return passwrodUpdated;
                    }
                    
                    res.status(202).json({msg: 'Info was updated successfully!', data: newInfo})
                }
                res.status(400).json({error: true, msg:`Can not update the info of the account`})
            })
            .catch(err => res.status(400).json({error: true, msg: err}))
    })

    
module.exports = router;