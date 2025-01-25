const login = require('../actions/auth/Login')
const register = require('../actions/auth/Register')
const { validationResult } = require('express-validator');

class AuthController {
    async register (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        const { user, token } = await register.create(request.body)

        response.cookie('token', token, { withCredentials: true, httpOnly: false });

        response.status(201)
            .json({
                message: "User Registered Successfully",
                success: true,
                user: user
            });
    }

    async login (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        response.cookie(
            'token',
            await login.authenticate(request.user._id),
            { withCredentials: true, httpOnly: false }
        );

        response.status(201)
            .json({
                message: "User Logged in Successfully",
                success: true,
                user: request.user
            });
    }
}

module.exports = new AuthController()