const router = require('express').Router();
const productModel = require('../models/product.model');

const getProducts = router.get('/products', (req, res) => {
    productModel.findAll()
        .then((products) => {
            if (products) return res.status(202).json({msg: 'Accepted', data: products})
            res.status(404).json({error: true, msg: 'Not Found!'})
        })
})

const getProductById = router.get('/products/:id', (req, res) => {
    let {id} = req.params;
    productModel.findByPk(id)
        .then((product) => {
            if (!product) return res.status(404).json({error: true, msg: `Product identify with id ${product.product_id} Not Found`})
            res.status(202).json({msg: 'Accepted', data: product})
        })
})

module.exports = getProducts, getProductById;