const sequelize = require('sequelize');
const connection = require('../database/connection');
const products = require('./product.model');
const orders = require('./order.model');

const orderDetailModel = connection.define('order_details', {
    orderDetail_id: {
        field: 'orderDetail_id',
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        field: 'product_id',
        type: sequelize.INTEGER,
        references: {
            model: products,
            key: 'product_id'
        }
    },
    quantity: {
        field: 'quantity',
        type: sequelize.INTEGER,
        allowNull: false
    },
    subtotal: {
        field: 'subtotal',
        type: sequelize.FLOAT,
        allowNull: false
    }, 
    order_id: {
        field: "order_id",
        type: sequelize.INTEGER,
        references: {
            model: orders,
            key: 'order_id'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = orderDetailModel;