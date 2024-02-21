const CreateInbox = require('../services/CreateInbox')
const User = require('../models/User')
const Inbox = require('../models/Inbox')
const Message = require('../models/Message')

const users = async (request, response) => {
    return response.status(200).json({
        status: 'success',
        users: await User.find({})
    })
}

const user = async (request, response) => {
    let inbox = Inbox.find({
        users: [request.params.id, request.user.id]
    })
}

const messages =  async (request, response) => {
    let inbox = await Inbox.find({users: {$all: request.body.users} })

    if (!inbox.length) return response.status(200).json({messages: []})

    return response.status(200).json({
        messages: await Message.find({inbox: inbox[0]._id}),
        inbox: inbox 
    })
}

const create = async (request, response) => {
    let { message, inbox, to, from } = request.body.data

    if (!inbox) inbox = await CreateInbox.create([from._id, to._id])

    let createdMessage = await Message.create({message, inbox, from, to})

    return response.status(200).json({
        message: createdMessage
    })
}

module.exports = { users, user, messages, create }
