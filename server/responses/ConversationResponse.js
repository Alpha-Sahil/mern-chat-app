const UserResponse = require('../responses/UserResponse')
class ConversationResponse {
    document (conversation, loggedInUser) {
        return {
            ...conversation.toObject(),
            // conversationUserTest: conversation.users.filter(user => loggedInUser._id.toString() !== user._id.toString()).at(0),
            conversationUser: UserResponse.document(conversation.users.filter(user => loggedInUser._id.toString() !== user._id.toString()).at(0))
        }
    }

    collection (conversations, loggedInUser) {
        return conversations.map(conversation => this.document(conversation, loggedInUser))
    }
}

module.exports = new ConversationResponse()