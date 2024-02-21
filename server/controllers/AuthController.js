const { response } = require('..')
const User = require('../models/User')
const { createJwtToken } = require('../services/CreateJwtToken')
const { loginAction } = require('../services/Auth')

const register = async (request, response) => {
    const { name, email, password, confirmPassword, phone } = request.body.data

    if (await User.findOne({ email })) {
        return response.json({
            success: false,
            message: 'User already exists',
        })
    } 

    if (password !== confirmPassword) {
        return response.json({
            success: false,
            message: 'Password and confirm password should be same.',
        })
    }

    let user = await User.create({name, email, phone, password})

    return response.json({
        'token': createJwtToken({ name: user.name, email: user.email }),
        'user': user 
    }).status(200)
}

const login = async (request, response) => {
    let email = request.body.data.email;

    let user = await User.findOne({ email })

    if (!user) return response.status(404).json({
        success: false,
        message: 'Credentials not found'
    })

    if (user.password === request.body.data.password) return response.status(200).json({
        success: true,
        message: 'Login Successfully',
        token: createJwtToken({
            name: user.name,
            email: user.email,
        }),
        user: user
    })
}

module.exports = { register, login }