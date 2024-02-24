const Inbox = require('../models/Inbox')
const User = require('../models/User')

const search = async (request, response) => {
    let users = await User.find({ name: {$regex: '.*' + request.query.text + '.*', $options: 'i'}})

    let searchResult = await Promise.all(
        users.filter(user => user._id.toHexString() != request.query.currentUser)
            .map(async (user) => {
                let userInbox = await Inbox.find({users: {$all: [user._id, request.query.currentUser]}})

                return {
                    user: user,
                    inbox: userInbox.length ? userInbox[0] : '' 
                }
    }))

    return response.status(200).json({users: searchResult})
}

module.exports = { search }