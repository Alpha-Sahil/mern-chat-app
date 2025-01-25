const bcrypt = require('bcryptjs');
const jwt = require('../../utils/jwt')
const userModel = require('../../database/models/users')
const { check } = require('express-validator');

class Register {
    async create (body) {
        let user = await userModel.create({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password.toString(), 10),
        })

        return {
            user: user,
            token : jwt.createSecretToken(user._id),
        }
    }

    validator () {
        return [
            check('name').notEmpty()
                .withMessage('The name is required'),
            check('email').notEmpty()
                .withMessage('The email is required')
                .isEmail()
                .withMessage('Invalid Email')
                .custom( async (value, { request }) => {
                    let user = await  userModel.find({ email: value })

                    if (user.length) throw new Error('User already exists with this email')
                }),
            check('password').notEmpty()
                .withMessage('The password is required')
                .isLength({ min: 5 })
                .withMessage('Password should greater than 5 letters'),
        ]
    }
}

module.exports = new Register()