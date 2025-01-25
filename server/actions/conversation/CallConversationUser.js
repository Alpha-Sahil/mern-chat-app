const userModel = require('../../database/models/users')
const mongoose = require('mongoose');
const { check } = require('express-validator');
const { _onlineUsers } = require('../../Sockets2')

class CallConversationUser {
    validate () {
        return [
            check('to').notEmpty()
                .withMessage('The reciver is required')
                .custom((value) => mongoose.Types.ObjectId.isValid(value))
                .withMessage('Sending message to invalid user')
                .custom(async (value) => {
                    let user = await userModel.find({_id: value})

                    if (!user.length) throw new Error('User not found')
                        
                    if (!!_onlineUsers[user._id]) throw new Error('User offline')
                }),
        ]
    }
}

module.exports = new CallConversationUser()