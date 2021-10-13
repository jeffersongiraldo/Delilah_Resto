const router = require('express').Router();
const jwt_decode = require('jwt-decode');
const createOrder = require('../utils/order.functions');

const newOrder = router.post('/newOrder', async(req, res) => {
    const order = req.body;
    const paymentMethod = req.body.payment_method;
    const user_id = jwt_decode(req.headers.authorization).user_id;
   
    const orderCreated = await createOrder(order, user_id);
    if (!orderCreated) return res.status(400).json({err: true, data: 'It was not possible create the order'})
    return res.status(201).json({msg: 'Order created', data: orderCreated, products: order.products})
})

module.exports = newOrder;