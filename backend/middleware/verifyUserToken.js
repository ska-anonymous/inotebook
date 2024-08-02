const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwtKey');

const verifyUserToken = (req, res, next) => {
    // first get the token from request headers
    const token = req.header('Auth-Token');

    // if token is not sent
    if (!token) {
        return res.json({ error: true, errorMessage: 'token not available' });
    }
    
    try {
        // if token is present then decode the token
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    }catch(err){
        return res.json({ error: true, errorMessage: 'invalid token' });
    }
}

module.exports = verifyUserToken;