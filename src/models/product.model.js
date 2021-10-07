const sequelize = require('sequelize');
const connection = require('../database/connection');

const productModel = connection.define('products', {
    product_id: {
        field: 'product_id',
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        field: 'product_name',
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        field: 'description',
        type: sequelize.STRING,
        allowNull: false
    },
    price: {
        field: 'price',
        type: sequelize.FLOAT,
        allowNull: false
    },
    img_url: {
        field: 'img_url',
        type: sequelize.STRING,
        allowNull: false
    },
    is_disable: {
        field: 'is_disable',
        type: sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = productModel;