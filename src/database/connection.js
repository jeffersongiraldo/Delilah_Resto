const Sequelize = require('sequelize');
const config = require('../config/config');

const path = `mariadb://${config.username_db}:${config.password}@localhost:33065/${config.dbname}`;
const sequelize = new Sequelize(path, {operatorAlises: false});

module.exports = sequelize;