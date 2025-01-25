const jwt = require('jsonwebtoken');
const userModel = require('../database/models/users')
const KEY = 'chatting-app'

class JWT {
    static async verify (token) {
        return jwt.verify(token, KEY, async (err, data) => {
            if (err) return false
            else {
                let user = await userModel.findById(data.id)

                if (!Object.keys(user).length) return false
                
                return user
            }
        })
    }
    
    static createSecretToken = (id) => {
        return jwt.sign(
            { id },
            KEY,
            { expiresIn: 3 * 24 * 60 * 60}
        );
    }
}

module.exports = JWT