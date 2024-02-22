const CreateInbox = require('../services/CreateInbox')
const User = require('../models/User')
const Inbox = require('../models/Inbox')
const Message = require('../models/Message')

const users = async (request, response) => {
    let inboxes = await Inbox.find({
        users: {
            $in: [request.query.currentUSerId]
        }
    })

    return response.status(200).json({
        status: 'success',
        users: await Promise.all(inboxes.map(async (inbox) => {
            return {
                inbox: inbox,
                user: await User.findById(inbox.users.filter(user => user != request.query.currentUSerId)[0]) 
            }
        })),
    })
}

const user = async (request, response) => {
    let inbox = Inbox.find({
        users: [request.params.id, request.user.id]
    })
}

const messages =  async (request, response) => {
    if (!request.body.users) return response.status(200).json({messages: []})

    return response.status(200).json({
        messages: await Message.find({inbox: request.body.users})
    })
}

const create = async (request, response) => {
    let { message, inbox, to, from } = request.body.data

    let createdMessage = await Message.create({message, inbox, from, to})

    return response.status(200).json({
        message: createdMessage
    })
}

module.exports = { users, user, messages, create }
