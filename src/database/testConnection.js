const sequelize = require('./connection');

sequelize.authenticate()
    .then(() => console.log('Successful connection'))
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => sequelize.close())