const sequelize = require('sequelize');
const connection = require('../database/connection');
const orders = require('./order.model');
const users = require('./user.model');

const billModel = connection.define('bills', {
    bill_id: {
        field: 'bill_id',
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
        allowNull: false
    },
    order_id: {
        field: 'order_id',
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: orders,
            key: 'order_id'
        }
    },
    paymentMethod: {
        field: 'paymentMethod',
        type: sequelize.STRING,
        allowNull: false
    },
    user_id: {
        field: 'user_id',
        type: sequelize.INTEGER,
        references: {
            model: users,
            key: 'user_id'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = billModel;