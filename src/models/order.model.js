const sequelize = require('sequelize');
const connection = require('../database/connection');
const users = require('./user.model');
const bills = require('./bill.model');

const orderModel = connection.define('orders', {
    order_id: {
        field: 'order_id',
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        field: 'date',
        type: sequelize.DATE,
        allowNull: false
    },
    total: {
        field: 'total',
        type: sequelize.FLOAT,
    },
    statusOrder: {
        field: 'statusOrder',
        type: sequelize.STRING,
    },
    user_id: {
        field: 'user_id',
        type: sequelize.INTEGER,
        references: {
            model: users,
            key: 'user_id'
        }
    },
    paymentMethod: {
        field: 'paymentMethod',
        type: sequelize.STRING
    },
    bill_id: {
        field: 'bill_id',
        type: sequelize.INTEGER,
        references: {
            model: bills,
            key: 'bill_id'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = orderModel;