const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token == null) return res.status(403).json({error: true, msg: 'Forbbiden'})
    jwt.verify(token, config.tokenSecret, (err, user) => {
        if (err) return res.status(401).json({error: true, msg: 'Token has expired. Please login again!'})
        req.user = user
        console.log(user)
        next();
    })
}

module.exports = authToken;