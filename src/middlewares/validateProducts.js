const productModel = require('../models/product.model');

const validateProduct = async (req, res, next) => {
    const infoProduct = req.body;
    if (infoProduct.product_name == undefined || infoProduct.description == undefined || infoProduct.price == undefined || infoProduct.img_url == undefined) {
        return res.status(401).json({error: true, msg: 'You must put the complete info of the product.'})
    }
    if (isNaN(infoProduct.price)) return res.status(401).json({error: true, msg: 'You have to put a correct price'})
    const productFound = await productModel.findOne({where: {product_name: infoProduct.product_name}})
    if(productFound) return res.status(401).json({error: true, msg: `It is already exist a product with this name ${infoProduct.product_name}`})
    return next();
}

module.exports = validateProduct;