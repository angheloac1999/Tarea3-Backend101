const jwt = require('jsonwebtoken');

const jwtSecret = 'thisismysecret';

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.json(401).json({code: 'UA', message: 'Authorization header is required!'})
    }
    const [type, token] = authorization.split(' ');
    if ( type !== 'Bearer') {
        res.json(401).json({code: 'UA', message: 'Authorization type is not supported'})
    }
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
}