const sequelize = require('sequelize');
const connection = require('../database/connection');

const productModel = connection.define('products', {
    product_id: {
        field: 'product_id',
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        field: 'productName',
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
    imgUrl: {
        field: 'imgUrl',
        type: sequelize.STRING,
        allowNull: false
    },
    isDisable: {
        field: 'isDisable',
        type: sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = productModel;