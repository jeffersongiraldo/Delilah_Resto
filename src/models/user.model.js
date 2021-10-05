const sequelize = require('sequelize');
const connection = require('../database/connection');

userModel = connection.define('users', {
    user_id: {
        field: 'user_id',
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        field: 'username',
        type: sequelize.STRING,
        allowNull: false
    },
    fullname: {
        field: 'fullname',
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        field: 'email',
        type: sequelize.STRING,
        unique: true,
        allowNull: false
    },
    cellphone: {
        field: 'cellphone',
        type: sequelize.NUMBER,
        allowNull: false
    },
    delivery_address: {
        field: 'delivery_address',
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        field: 'password',
        type: sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        field: 'isAdmin',
        type: sequelize.STRING,
        allowNull: true
    },
    adminCode: {
        field: 'adminCode',
        type: sequelize.STRING,
        allowNull: true
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

module.exports = userModel;