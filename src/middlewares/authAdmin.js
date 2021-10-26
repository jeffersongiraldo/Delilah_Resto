const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

const authAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (req.headers.authorization == undefined) return res.status(401).json({error: true, msg: 'Please you have login!'})
    jwt.verify(token, config.tokenSecret, (err, decoded) => {
        if (err) return res.status(401).json({error: true, msg: `Unauthorized`})
        if (decoded.isAdmin == 'true' && bcrypt.compare(config.adminCode, decoded.adminCode)) {
            next();
        } else {
            return res.status(403).json({error: true, msg: 'Sorry! But this section is just for authorized personal'})
        }
    })
}

module.exports = authAdmin;