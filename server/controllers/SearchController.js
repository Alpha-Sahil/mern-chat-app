const User = require('../models/User')

const search = async (request, response) => {
    return response.status(200)
                .json({users: await User.find({ name: {$regex: '.*' + request.query.text + '.*', $options: 'i'}})
                })
}

module.exports = { search }