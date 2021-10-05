require('dotenv').config();

const config = {
    port: parseInt(process.env.PORT) || 3001,
    username_db: process.env.USERNAME_DB,
    password: process.env.PASSWROD || "",
    dbname: process.env.DBNAME,
    tokenSecret: process.env.TOKEN_SECRET,
    adminCode: process.env.ADMIN_CODE
}

module.exports = config;