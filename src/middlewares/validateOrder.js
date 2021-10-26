const productModel = require('../models/product.model');

module.exports = async(req, res, next) => {
    const productsId = req.body.products.map(el => {
        return el.product_id
    })
    const arrayId = []
    for(let i = 0; i<productsId.length; i++) {
        await productModel.findByPk(productsId[i])
            .then(product => {
                if (!product || product == undefined || product == null) return res.status(404).json({error: true, msg: `The product with id ${productsId[i]} does NOT exist. Please check it and select the available products!`})
                arrayId.push(product.product_id)
                return arrayId
            })
            .catch(err => {
                return res.status(404).json({error: true, msg: `Error validation in the request ${err}`})
            })
    }
    if(arrayId.indexOf(null) === -1) return next();
}