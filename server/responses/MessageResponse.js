const userResponse = require('./UserResponse')

class MessageResponse {
    document (message, loggedInUser) {
        return {
            ...message.toObject(),
            from: userResponse.document(message.from),
            to: userResponse.document(message.to),
            isOwner: message.from._id.toString() === loggedInUser._id.toString()
        }
    }

    collection (messages, loggedInUser) {
        return messages.map((message) => this.document(message, loggedInUser))
    }
}

module.exports = new MessageResponse()