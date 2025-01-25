const bcrypt = require('bcryptjs');
const jwt = require('../../utils/jwt')
const userModel = require('../../database/models/users')
const { check } = require('express-validator');

class Login {
    async authenticate (userId) {
        return jwt.createSecretToken(userId)
    }

    validator () {
        return [
            check('email').notEmpty()
                .withMessage('The email is required')
                .isEmail()
                .withMessage('Invalid Email')
                .custom(async (value, { req: request }) => {
                    let user = await userModel.find({ email: request.body.email })
                    
                    if (!user.length) throw new Error('Invalid Credentials');
                    
                    else request.user = user.shift()
                }),
            check('password').notEmpty()
                .withMessage('The password is required')
                .custom(async (value, { req: request }) => {
                    if (
                        request.user
                        &&
                        !bcrypt.compareSync(value.toString(), request.user.password)
                    ) throw new Error('Invalid Credentials')
                }),
        ]
    }
}

module.exports = new Login()