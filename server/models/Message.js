const mongoose = require('mongoose')

const Message = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    inbox: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'inboxes',
    }
})