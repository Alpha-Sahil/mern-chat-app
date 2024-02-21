const Inbox = require('../models/Inbox')

const create = async (request, response) => {
    let inbox = await Inbox.create({
        users: request.body.users,
        type: 'dm'
    })

    return response.status(200).json({
        status: 'success',
        inbox: inbox
    })
}

module.exports = { create }