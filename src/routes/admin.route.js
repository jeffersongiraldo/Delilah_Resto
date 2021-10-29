const router = require('express').Router();
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const orderModel = require('../models/order.model');
const orderDetailModel = require('../models/orderDetail.model');

//Functions of the admin route
const adminFunctions = require('../utils/admin.functions')

//Middleware para el endpoint POST admin/products
const validateProduct = require('../middlewares/validateProducts');


router
    //Endpoints de la ruta admin/users
    .get('/users', (req, res) => {
        userModel.findAll()
            .then(users => {
                if (users) {

                    //Create a new array with the users data to show it without their password and the adminCode
                    const dataUsers = users.map(user => {
                        if(user.password !== undefined) {
                            user.password = undefined;
                            user.adminCode = undefined;
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

        //Validate if the user Id is a number  
        if(isNaN(id)) return res.status(400).json({error: true, msg:'The ID should be a number'});
        
        userModel.findByPk(id)
            .then((user) => {
                if (!user || user == undefined || user == null) return res.status(404).json({error: true, msg: `User identify with id ${id} Not Found`})
                
                //Omit the private information of the user before to send it 
                const userData = user;
                if(userData.password !== undefined) {
                    userData.password = undefined;
                    userData.adminCode = undefined;
                    return res.status(202).json({msg: 'Accepted', data: userData});
                }
            })
    })

    .delete('/users/:id', (req, res) => {
        let {id} = req.params;

        //Validate if the user Id is a number 
        if(isNaN(id)) return res.status(400).json({error: true, msg:'Id should be a number'});
        
        userModel.findByPk(id)
            .then(user => {
                user.destroy()    
                    .then(() => res.status(200).json({msg: `The user with id ${id} has been deleted successfully`}))
                    .catch(err => {
                        res.status(400).json({error: true, msg: `There was a problem in the process of deleting ${err}`})
                    })
            })
            .catch(err => {
                res.status(400).json({error: true, msg: `The user with id ${id} Not Found`})
            })
    })

    
    //Endpoints de la ruta admin/products
    .get('/products', (req, res) => {
        productModel.findAll()
            .then(products => {
                return res.status(202).json({msg: 'Accepted', data: products})
            })
            .catch(err => {
                return res.status(404).json({error: true, msg: 'Products not found'})
            })
    })

    .get('/products/:id', (req, res) => {
        let {id} = req.params;

        //Validate if the product Id is a number 
        if (isNaN(id)) return res.status(400).json({error: true, msg:'Id should be a number'});
        
        productModel.findByPk(id)
            .then(product => {
                if(!product) return res.status(404).json({error: true, msg: `Product with id ${id} not found`})
                if (product) return res.status(202).json({msg: `Accepted`, data: product})
            })
            .catch(err => {
                return res.status(404).json({error: true, msg: `There is an error ${err}`})
            })
    })

    .post('/products', validateProduct, (req, res) => {
        newProduct = req.body;
        productModel.create(newProduct)
            .then(product => {
                res.status(201).json({msg: 'The product was created succesfully', data: product})
            })
            .catch(err => {
                return res.status(400).json({error: true, msg: `There is an error with the process ${err}`})
            })
    })

    .put('/products/:id', async (req, res) => {
        let {id} = req.params;

        //Validate if the product Id is a number 
        if(isNaN(id)) return res.status(400).json({error: true, msg: 'The id must be a number, not a string'})
        
        const newInfoProduct = req.body;
        await productModel.update(newInfoProduct, {
            where: {product_id: id}
        })
            .then(async result => {
                if(result == 1) {
                    const productUpdated = await productModel.findByPk(id);
                    return res.status(202).json({msg: `The product was updated`, data: productUpdated})
                }
                return res.status(400).json({error: true, msg: `Error with the product id or with the attribute to update`})
            })
            .catch(err => {
                res.status(400).json({error: true, msg: `There is an error with the update ${err}`})
            })
    })

    .delete('/products/:id', (req, res) => {
        let {id} = req.params;

        //Validate if the product Id is a number 
        if(isNaN(id)) return res.status(400).json({error: true, msg: 'The id must be a number, not a string'})
        
        productModel.findByPk(id)
            .then(product => {

                //Validate if the product to delete is in any order
                orderDetailModel.findAll({ where: {product_id: id}})
                    .then(async result => {

                        //Condition: If the product is in any order can't delete. So, this product would be disable
                        if(result.length > 0) {
                            disable = {isDisable: "true"}
                            await productModel.update(disable, {
                                where: {product_id: id}
                            })
                                .then(result => {
                                    if(result == 1) {
                                        return res.status(202).json({msg: `The product ${id} has been disabled`})
                                    }    
                                    return res.status(400).json({error: true, msg: `Error in disabled of the product`})
                                })
                                .catch(err => {
                                    return res.status(400).json({error: true, msg: `There is an error updating the status of disabled of the product ${err}`})
                                })
                        }

                        //If the product is NOT in any order, it would be delete of the database.
                        product.destroy()
                            .then(() => {
                                return res.status(202).json({msg: `The product with id ${id} has been deleted successfully!`})
                            })
                            .catch(async err => {
                                return res.status(400).json({error: true, msg: `There was a problem in the process of deleting ${err}`})
                                
                            })

                    })
                    .catch(err => {
                        res.status(400).json({error: true, msg: `There is a problem searching the order details of product_id ${id} Not Found`})
                    })
            })
            .catch(err => {
                res.status(400).json({error: true, msg: `The product with id ${id} Not Found`})
            })
    })


    //Endpoints de la ruta admin/orders

    .get('/orders', (req, res) => {
        orderModel.findAll()
            .then(orders => {
                res.status(202).json({msg: 'Accepted', data: orders})
            })
            .catch(err => {
                res.status(404).json({error: true, msg: `Orders not found ${err}`})
            })
    })

    .get('/orders/:id', (req, res) => {
        let {id} = req.params;

        //Validate if the order Id is a number 
        if(isNaN(id)) return res.status(400).json({error: true, msg: 'The id must be a number, not a string or a symbol'})

        orderModel.findByPk(id)
            .then(order => {
                if(!order) return res.status(404).json({error: true, msg: `Product with id ${id} not found`})
                return res.status(202).json({msg: 'Accepted', data: order})
            })
            .catch(err => {
                return res.status(404).json({error: true, msg: `There is an error ${err}`})
            })
    })

    .put('/orders/:id', async(req, res) => {
        let {id} = req.params;

        //Validate if the product Id is a number 
        if(isNaN(id)) return res.status(400).json({error: true, msg: 'The id must be a number, not a string'})

        //The admin just can update the property statusOrder of the order
        if(!req.body.hasOwnProperty('statusOrder')) return res.status(400).json({error: true, msg: 'It is only possible to update the status of an order'})
        
        //Transfrom the string in the body to lowercase
        let newStatusOrder = req.body.statusOrder.toLowerCase();
        
        const statusOrderOptions = ['new', 'confirmed', 'in process', 'sending', 'delivered', 'canceled'];

        //Status order Validation
        if(!statusOrderOptions.includes(newStatusOrder)) {
            return res.status(400).json({error: true, msg: 'You must put a correct status order to update'})
        } 

        const statusOrderUpdate = {
            statusOrder: newStatusOrder
        };

        await orderModel.findByPk(id)
            .then(async order => {

                //Validate that the status order to update wouldnt be the same than the actual status
                if(order.statusOrder === newStatusOrder) return res.status(401).json({error: true, msg: `The order have the same status ${newStatusOrder}. Try with other one`})
                
                await orderModel.update(statusOrderUpdate, {
                    where: {order_id: id}
                })
                    .then(async result => {
                        const orderUpdated = await orderModel.findByPk(id)
                        return res.status(202).json({msg: `The order was updated`, data: orderUpdated});
                    })
                    .catch(err => {
                        return res.status(400).json({error: true, msg: `There is an error with the update ${err}`})
                    })
            })
            .catch(err => {
                return res.status(400).json({error: true, msg: `There is an error with the order_id ${id}`, err: err})
            })
    })

    .delete('/orders/:id', (req, res) => {
        let {id} = req.params;

        //Validate if the order Id is a number 
        if(isNaN(id)) return res.status(400).json({error: true, msg:'Id should be a number'});
        
        orderModel.findByPk(id)
            .then(user => {
                user.destroy()    
                    .then(() => res.status(200).json({msg: `The order with id ${id} has been deleted successfully`}))
                    .catch(err => {
                        res.status(400).json({error: true, msg: `There was a problem in the process of deleting ${err}`})
                    })
            })
            .catch(err => {
                res.status(400).json({error: true, msg: `The order with id ${id} Not Found`})
            })
    })

    
    // Endpoint GET /admin
    .get('/', async(req, res) => {

        //Function to get the number of active users, available products and all orders
        const data = await adminFunctions.resumeData();
        
        if(data == false) return res.status(400).json({error: true, msg: `There is an error with the request`})
        const allData = {
            users: data[0],
            products: data[1],
            orders: data[2]
        }
        return res.status(202).json({msg: 'This is the data of the users, products and orders until now', data: allData})
    })

module.exports = router;