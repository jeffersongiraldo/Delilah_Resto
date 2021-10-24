require('dotenv').config();

const config = {
    port: parseInt(process.env.PORT) || 3001,
    usernameDb: process.env.USERNAME_DB || "root",
    passwordDb: process.env.PASSWORD_DB || "",
    portDb: process.env.PORT_DB,
    dbname: process.env.DBNAME || "delilah_resto_db",
    tokenSecret: process.env.TOKEN_SECRET,
    adminCode: process.env.ADMIN_CODE
}

module.exports = config;