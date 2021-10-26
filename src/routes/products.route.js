const router = require('express').Router();
const productModel = require('../models/product.model');

router
    //Endpoints of the /products route
    .get('/', (req, res) => {

        //Get all available products 
        productModel.findAll({where: {isDisable: 'false'}})
            .then((products) => {
                if (products) return res.status(202).json({msg: 'Accepted', data: products})
                res.status(404).json({error: true, msg: 'Not Found!'})
            })

    })

    .get('/:id', (req, res) => {
        let {id} = req.params;

        //Validate that the product Id would be a number
        if(isNaN(id)) return res.status(400).json({error: true, msg:'Id should be a number'});
        
        productModel.findByPk(id)
            .then((product) => {
                //Find the product in the database
                if (!product) return res.status(404).json({error: true, msg: `Product identify with id ${id} Not Found`})
                
                //Validate that the product is available
                if(product.isDisable === 'true') res.status(404).json({error: true, msg: `Product identify with id ${id} is Not available in this moment.`})
                
                res.status(202).json({msg: 'Accepted', data: product})
            })
    })

module.exports = router;