const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authToken = (req, res, next) => {
    const token = req.headers.authorization;

    // Validation that exists a token
    if (token == null) return res.status(403).json({error: true, msg: 'Forbbiden'})

    // Token validation to login like a client
    jwt.verify(token, config.tokenSecret, (err, user) => {
        if (err) return res.status(401).json({error: true, msg: 'Token has expired. Please login again!'})
        req.user = user
        next();
    })
}

module.exports = authToken;