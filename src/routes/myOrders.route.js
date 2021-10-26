const router = require('express').Router();
const jwt_decode = require('jwt-decode');
const orderModel = require('../models/order.model');

router
    //Endpoints of the account/myOrders
    .get('/', async(req, res) => {
        const token = req.headers.authorization;
        const tokenDecoded = jwt_decode(token);
        
        //Get just the orders of the user
        await orderModel.findAll({
            where: {user_id: parseInt(tokenDecoded.user_id)}
        })
        .then(ordersFound => {
            if(ordersFound.length > 0) return res.status(202).json({msg: 'Accepted', data: ordersFound})
            return res.status(401).json({error: true, msg: `There are not orders made by the user ${tokenDecoded.user_id}`})
        })
        .catch(err => {
            return Error({error: true, msg: `There is an error with the server ${err}`})
        })
    })

    .get('/:id', async (req, res) => {
        const token = req.headers.authorization;
        const tokenDecoded = jwt_decode(token);
        let {id} = req.params

        //Validate that the order Id would be a number
        if(isNaN(id)) return res.status(400).json({error: true, msg:'Id should be a number'});
        
        //Get just the orders of the user
        await orderModel.findAll({
            where: {user_id: parseInt(tokenDecoded.user_id)}
        })
        .then(async ordersFound => {
            if(ordersFound.length > 0) {

                //Get the specific order with its Id
                const orderFound = await ordersFound.find(order => order.order_id == id)
                
                if(orderFound) return res.status(202).json({msg: 'Accepted', data: orderFound})
                return res.status(401).json({error: true, msg: `There is not an order made by the user ${tokenDecoded.user_id} with this id`})
            }
            return res.status(401).json({error: true, msg: `There are not orders made by the user ${tokenDecoded.user_id}`})
        })
        .catch(err => {
            return res.status(401).json({error: true, msg: `There is an error with the server ${err}`})
        })
    })



module.exports = router;

