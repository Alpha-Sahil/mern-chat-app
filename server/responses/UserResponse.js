const moment = require('moment')
class UserResponse {
    document (user) {
        return {
            ...user.toObject(),
            profileURL: `https://robohash.org/${user.name}`,
            joinedAt: moment(user.createdAt).format('M MMM YYYY')
        }
    }
}

module.exports = new UserResponse()