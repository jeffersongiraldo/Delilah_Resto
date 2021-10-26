const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const orderModel = require('../models/order.model');

module.exports = {
    resumeData: async() => {

        //Count all the available users
        const numUsersAvailable = await userModel.findAll({where: {isDisable: 'false'}})
                                .then(result => {
                                    return result.length
                                })
                                .catch(err => {
                                    return false;
                                })

        //Count all the available products
        const numProductsAvailable = await productModel.findAll({where: {isDisable: 'false'}})
                                        .then(result => {
                                            return result.length;
                                        })
                                        .catch(err => {
                                            return false;
                                        })
        
        // Count all the orders made by the users
        const numOrders = await orderModel.findAll()
                            .then(result => {
                                return result.length
                            })
                            .catch(err => {
                                return false;
                            })
                            
        if(numUsersAvailable == false || numOrders == false || numProductsAvailable == false) return false;
        const numbers = [numUsersAvailable, numProductsAvailable, numOrders];
        return numbers;
    }
}








