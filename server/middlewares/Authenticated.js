require('dotenv').config()
const jwt = require('jsonwebtoken');

const authenticate = (request, response, next) => {
    // console.log( 'token' + request.headers['x-token'])
    jwt.verify(request.headers['x-token'], process.env.SECRET, (error, decoded) => {
        // if (error) response.status(403).json({'message': 'unauthenticated'})
    });

    next()
}

module.exports = { authenticate }