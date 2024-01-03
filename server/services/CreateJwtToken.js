require('dotenv').config()
const jwt = require('jsonwebtoken');

const createJwtToken = (data) => {
    return jwt.sign(
        data,
        process.env.SECRET,
        {
            expiresIn: '1h'
        }
    )
}

const verifyJsonToken = () => {

}

module.exports = { createJwtToken, verifyJsonToken }