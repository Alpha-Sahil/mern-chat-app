const CreateConversation = require('./CreateConversation')
const conversationModel = require('../database/models/conversation')
const messageModel = require('../database/models/message')
const messageResponse = require('../responses/MessageResponse')
const Socket = require('../Sockets2')
const socketServer = require('../server')
const mongoose = require('mongoose');
const userModel = require('../database/models/users')
const { check } = require('express-validator');

class CreateMessage {
    async create (user, input) {
        let conversation = input.conversation

        if (!conversation) conversation = await CreateConversation.create(user, input)

        let message = await messageModel.create({
            from: user._id,
            to: input.to,
            message: input.message,
            status: 'sent',
            conversation: conversation
        })

        await conversationModel.findOneAndUpdate(
            { _id: conversation },
            { lastMessage: input.message },
        )

        let populateedMessage = await message.populate('from')
        
        populateedMessage = await message.populate('to')

        populateedMessage = messageResponse.document(populateedMessage, user)

        Socket.sendMessage(input.to, JSON.stringify(populateedMessage))

        return populateedMessage
    }

    validate () {
        return [
            check('to').notEmpty()
                        .withMessage('The reciver is required')
                        .custom((value) => mongoose.Types.ObjectId.isValid(value))
                        .withMessage('Sending message to invalid user')
                        .custom(async (value) => {
                            let user = await userModel.find({_id: value})

                            if (!user.length) throw new Error('User not found')
                        }),
            check('conversation').notEmpty()
                                .withMessage('The conversation is required')
                                .custom((value) => mongoose.Types.ObjectId.isValid(value))
                                .withMessage('Invaid conversation')
                                .custom(async (value) => {
                                    let user = await conversationModel.find({_id: value})
        
                                    if (!user.length) throw new Error('Conversation not found')
                                }),
            check('message').notEmpty()
                            .withMessage('The message is required')
        ]
    }
}

module.exports = new CreateMessage()