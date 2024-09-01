const user = require('../database/models/users')
const conversationModel = require('../database/models/conversation')

class UserController {
    async index (request, response) {
        response.json({
            status: 'sucess',
            users: await user.find({})
        })
    }

    async search (request, response) {
        let users = request.query.text ? await user.find({ name: {$regex: `.*${request.query.text}.*`}}) : []

        response.json({
            status: 'sucess',
            users: users.filter(user => {
                return user._id.toString() !== request.user._id.toString()
            })
        })
    }

    async conversation (request, response) {
        let conversation = await conversationModel.find({ users: { $all: [request.user._id, request.query.conversationUser._id.toString()] } })

        return response.json({
            status: 'success',
            conversation: conversation
        })
    }
}

module.exports = new UserController()