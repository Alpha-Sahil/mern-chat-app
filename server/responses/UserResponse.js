class UserResponse {
    document (user) {
        return {
            ...user.toObject(),
            profileURL: `https://robohash.org/${user.name}`,
        }
    }
}

module.exports = new UserResponse()