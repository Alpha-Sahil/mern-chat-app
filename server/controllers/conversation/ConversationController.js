const conversation = require('../../database/models/conversation')
const CreateConversation = require('../../actions/conversation/CreateConversation')
const ConversationResponse = require('../../responses/ConversationResponse')
const Socket = require('../../Sockets2')
const { validationResult } = require('express-validator');

class ConversationController {
    async index (request, response) {
        let conversations = await conversation.find({ users: { $elemMatch: { $eq: request.user._id } } })
                                            .populate('users')
                                            .exec()

        response.json({
            status: 'success',
            conversations: ConversationResponse.collection(conversations, request.user)
        })
    }

    async create (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        let conversation = await CreateConversation.create(request.user, request.body)

        response.json({
            status: 'success',
            conversation: conversation
        })
    }

    async call (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        Socket.callConversationUser(request.body)

        response.json({
            status: 'success',
            message: 'Call Initiated Successfully'
        })
    }
}

module.exports = new ConversationController()