class ConversationResponse {
    document (conversation, loggedInUser) {
        return {
            ...conversation.toObject(),
            conversationUser: conversation.users.filter(user => loggedInUser._id.toString() !== user._id.toString()).at(0)
        }
    }

    collection (conversations, loggedInUser) {
        return conversations.map(conversation => this.document(conversation, loggedInUser))
    }
}

module.exports = new ConversationResponse()