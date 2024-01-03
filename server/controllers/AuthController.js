const { response } = require('..')
const User = require('../models/User')
const { createJwtToken } = require('../services/CreateJwtToken')
const { loginAction } = require('../services/Auth')

const register = async (request, response) => {
    const { name, email, password, confirmPassword, phone } = request.body.data

    if (await User.findOne({ email })) {
        response.json({
            success: false,
            message: 'User already exists',
        })
    } 

    if (password !== confirmPassword) {
        response.json({
            success: false,
            message: 'Password and confirm password should be same.',
        })
    }

    let user = await User.create({name, email, phone, password})

    response.cookie(
        'token',
        createJwtToken({ name: user.name, email: user.email }),
        { httpOnly: true }
    ).sendStatus(200)

    // response.json({
    //     token: createJwtToken({
    //         name: user.name,
    //         email: user.email,
    //     })
    // })
}

const login = async (request, register) => {
    let email = request.body.email;
    
    let user = await User.findOne({ email })

    if (!user) response.status(404).json({
        success: false,
        message: 'Credentials not found'
    })

    if (user.password === request.body.password) response.status(200).json({
        success: true,
        message: 'Login Successfully',
        token: createJwtToken({
            name: user.name,
            email: user.email,
        })
    })
}

module.exports = { register, login }