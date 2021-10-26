const productModel = require('../models/product.model');

module.exports = async(req, res, next) => {
    //Mapping the array of products to take the products Id
    const productsId = req.body.products.map(el => {
        return el.product_id
    })

    const arrayId = []
    for(let i = 0; i<productsId.length; i++) {
        await productModel.findByPk(productsId[i])
            .then(product => {
                //Validate if all of products Id exist in the list of available products
                if (!product || product == undefined || product == null) return res.status(404).json({error: true, msg: `The product with id ${productsId[i]} does NOT exist. Please check it and select the available products!`})
                let validProductId = product.product_id;
                if (product.isDisable == 'true') {
                    res.status(404).json({error: true, msg: `The product with id ${productsId[i]} is disable in the moment. Please check it and select the available products!`})
                    validProductId = null;
                    return validProductId;
                } 
                console.log(`THIS IS THE ValidProductsId ${validProductId}`)
                arrayId.push(validProductId);
                return arrayId
            })
            .catch(err => {
                return res.status(404).json({error: true, msg: `Error validation in the request ${err}`})
            })
    }
    console.log(`THIS IS THE ARRAY OF IDs ${arrayId}`)
    if(arrayId.length === productsId.length && arrayId.indexOf(null) === -1) return next();
}