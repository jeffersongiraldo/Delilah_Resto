const Sequelize = require('sequelize');
const config = require('../config/config');

const path = `mariadb://${config.usernameDb}:${config.passwordDb}@localhost:${config.portDb}/${config.dbname}`;
const sequelize = new Sequelize(path, {operatorAlises: false});

module.exports = sequelize;