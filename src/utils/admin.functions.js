const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const orderModel = require('../models/order.model');

module.exports = {
    resumeData: async() => {

        const numUsersAvailable = await userModel.findAll({where: {isDisable: 'false' || 'NULL'}})
                                .then(result => {
                                    return result.length
                                })
                                .catch(err => {
                                    return false;
                                })
        const numOrders = await orderModel.findAll()
                            .then(result => {
                                return result.length
                            })
                            .catch(err => {
                                return false;
                            })
        const numProductsAvailable = await productModel.findAll({where: {isDisable: 'false'}})
                                        .then(result => {
                                            return result.length;
                                        })
                                        .catch(err => {
                                            return false;
                                        })
        if(numUsersAvailable == false || numOrders == false || numProductsAvailable == false) return false;
        const numbers = [numUsersAvailable, numProductsAvailable, numOrders];
        return numbers;
    }
}








