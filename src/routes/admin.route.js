const router = require('express').Router();
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const orderModel = require('../models/order.model');
const billModel = require('../models/bill.model');


router
    .get('/users', (req, res) => {
        userModel.findAll()
            .then(users => {
                if (users) {
                    const dataUsers = users.map(user => {
                        console.log(`This is the conditional ${user.password !== undefined}`)
                        if(user.password !== undefined) {
                            user.password = undefined;
                            user.adminCode = undefined;
                            console.log(`This is the new user ${user.password}`)
                            return user;
                        }
                        
                        return user;
                    })
                    return res.status(200).json({msg: 'Accepted', data: dataUsers})
                }
                res.status(404).json({msg: 'Users Not Found'})
            })
    })

    .get('/users/:id', (req, res) => {
        let {id} = req.params;
        if(isNaN(id)) return res.status(400).json({error: true, msg:'The ID should be a number'});
        userModel.findByPk(id)
            .then((user) => {
                if (!user || user == undefined || user == null) return res.status(404).json({error: true, msg: `User identify with id ${id} Not Found`})
                const userData = user;
                if(userData.password !== undefined) {
                    userData.password = undefined;
                    userData.adminCode = undefined;
                    console.log(`This is the new user ${userData.username}`)
                    return res.status(202).json({msg: 'Accepted', data: userData});
                }
            })
    })

    .delete('/users/:id', (req, res) => {
        let {id} = req.params;
        if(isNaN(id)) return res.status(400).json({error: true, msg:'Id should be a number'});
        userModel.findByPk(id)
            .then(user => {
                user.destroy().then(() => res.status(200).json({msg: `The user with id ${id} has been deleted succesfully`}))
            })
            .catch(err => res.status(400).json({error: true, msg: `There is an error with the id selected ${err}`}))
    })




module.exports = router;