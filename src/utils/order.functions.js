const momentLibrary = require('moment');
const moment = momentLibrary();
const productModel = require('../models/product.model');
const orderDetailModel = require('../models/orderDetail.model');
const orderModel = require('../models/order.model');
const billModel = require('../models/bill.model');

//Function to get each price of the products selected by the user
const getPriceProducts = async (array) => {
    const newArray = [];
    for (let i=0; i<array.length; i++) {
        let product= await productModel.findByPk(array[i].product_id)
        let price = product.price
        let productWithPrice = {...array[i], price: price}
        newArray.push(productWithPrice)
    };
    if(newArray.length == array.length) {
        return newArray
    } else {
        return Error({Error: 'Error in getting prices'});
    }
}

//Function to create and insert the order Details for each product of the order
const insertOrderDetail = async (orderId, array) => {
    const register = await array.map((el) => {
        let product_id = el.product_id;
        let quantity = parseInt(el.quantity);
        let price = parseInt(el.price);
        let subtotal = quantity*price;
        const created = {
            product_id,
            quantity,
            subtotal,
            order_id: orderId
        }
        return created;
    })
    const insertDetail = await orderDetailModel.bulkCreate(register);
    return(register);
}

//Function to create the bill of the order
const createBill = async (order) => {
    const newBill = {
        date: order.date,
        total: order.total,
        order_id: order.order_id,
        paymentMethod: order.paymentMethod,
        user_id: order.user_id 
    }
    const billCreated = await billModel.create(newBill)
    return billCreated;
}

// Function to update the order in the property bill_id
const updateBillId = async(order, bill) => {
    const item = {
        bill_id: bill
    }
    await orderModel.update(item, { where: {order_id: order.order_id}})
}

const createOrder = async (newOrder, user_id) => {
    try {
        const arrayOrderWithPrices = await getPriceProducts(newOrder.products)
        
        //Get the subtotal per product of the order
        const subtotalPerProduct = [];
        for (let i=0; i<arrayOrderWithPrices.length; i++) {
            let quantity = arrayOrderWithPrices[i].quantity;
            let priceProduct = arrayOrderWithPrices[i].price;
            let subtotalProduct = quantity * priceProduct;
            subtotalPerProduct.push(subtotalProduct);
        }

        //Get the total of the order
        let totalOrder = 0;
        subtotalPerProduct.forEach(price => {totalOrder += price} )
        
        //Get the date of the moment to create the order
        const orderDate = moment.format('YYYY-MM-DD HH:mm:ss');

        //Format to send the order to the database
        const orderFormat = {
            date: orderDate,
            total: totalOrder,
            user_id: parseInt(user_id),
            paymentMethod: newOrder.paymentMethod
        }
        
        try {
            const orderCreated = await orderModel.create(orderFormat)
            const idNewOrder = orderCreated.order_id;
            const order_detail = await insertOrderDetail(idNewOrder, arrayOrderWithPrices);
            const create_bill = await createBill(orderCreated)
            const bill_id = await create_bill.bill_id;
            let query = { order_id: orderCreated.order_id }
            const finalOrder = await updateBillId(orderCreated, bill_id)
            if (orderCreated)  {
                return orderCreated;
            } else {
                return({error: true, msg: 'the order was not updated'})
            } 
        } catch (error) {
            return error
        }
    } catch (err) {
        return Error({err: err.message});
    }
     
}

module.exports = createOrder;