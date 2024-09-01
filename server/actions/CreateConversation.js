const conversationModel = require('../database/models/conversation')
const { check } = require('express-validator');
const userModel = require('../database/models/users')

class CreateConversation {
    create(user, input) {
        let conversation = conversationModel.create({
            users: [user._id, input.currentConversationUser,],
            lastMessage: input.message,
            type: 'private'
        })

        return conversation._id
    }

    validate () {
        return [
            check('currentConversationUser').notEmpty()
                        .withMessage('The user is required')
                        .custom(async (value) => {
                            let user = await userModel.find({ _id: value })
                            
                            if(!user.length) throw new Error('Invalid user')
                        })
        ]
    }
}

module.exports = new CreateConversation()