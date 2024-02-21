const Inbox = require('../models/Inbox')

const create = async (usersIds) => {
    return await Inbox.create({
        users: usersIds,
        type: 'dm'
    })
}

module.exports = { create }