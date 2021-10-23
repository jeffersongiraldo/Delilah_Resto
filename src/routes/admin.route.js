const router = require('express').Router();
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const orderModel = require('../models/order.model');
const billModel = require('../models/bill.model');


router
    //Endpoints de la ruta admin/users
    .get('/users', (req, res) => {
        userModel.findAll()
            .then(users => {
                if (users) {
                    const dataUsers = users.map(user => {
                        console.log(`This is the conditional ${user.password !== undefined}`)
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
        if(isNaN(id)) return res.status(400).json({error: true, msg:'The ID should be a number'});
        userModel.findByPk(id)
            .then((user) => {
                if (!user || user == undefined || user == null) return res.status(404).json({error: true, msg: `User identify with id ${id} Not Found`})
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
        if(isNaN(id)) return res.status(400).json({error: true, msg: 'The id must be a number, not a string'})
        const newInfoProduct = req.body;
        await productModel.update(newInfoProduct, {
            where: {product_id: id}
        })
            .then(async result => {
                console.log(result)
                if(result == 1) {
                    const productUpdated = await productModel.findByPk(id);
                    return res.status(400).json({msg: `The product was updated`, data: productUpdated})
                }
                return res.status(400).json({error: true, msg: `The product with id ${id} Not Found`})
            })
            .catch(err => {
                res.status(400).json({error: true, msg: `There is an error with the update ${err}`})
            })
    })

    .delete('/products/:id', (req, res) => {
        let {id} = req.params;
        if(isNaN(id)) return res.status(400).json({error: true, msg: 'The id must be a number, not a string'})
        productModel.findByPk(id)
            .then(product => {
                product.destroy()
                    .then(() => {
                        res.status(202).json({msg: `The product with id ${id} has been deleted successfully!`})
                    })
                    .catch(err => {
                        res.status(400).json({error: true, msg: `There was a problem in the process of deleting ${err}`})
                    })
            })
            .catch(err => {
                res.status(400).json({error: true, msg: `The product with id ${id} Not Found`})
            })
    })

    //Endpoints de la ruta admin/orders



module.exports = router;