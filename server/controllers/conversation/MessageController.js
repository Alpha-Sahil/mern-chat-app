const messageModel = require('../../database/models/message')
const MessageResponse = require('../../responses/MessageResponse')
const CreateMessage = require('../../actions/conversation/CreateMessage')
const { validationResult } = require('express-validator');

class MessageController {
    async index (request, response) {
        let messages = await messageModel.find({ conversation: request.params.conversation })
                                        .populate('from')
                                        .populate('to')
                                        .exec()

        response.json({
            status: 'success',
            messages: MessageResponse.collection(messages, request.user)
        })
    }

    async create (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        let createdMessage = await CreateMessage.create(request.user, request.body)

        response.json({
            status: 'success',
            message: 'Message Created Successfully',
            createdMessage: createdMessage
        })
    }
}

module.exports = new MessageController()