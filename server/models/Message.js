const mongoose = require('mongoose')
const { Schema } = mongoose;

const STATUS = {
    sent: 'sent',
    draft: 'draft',
    deleted: 'deleted'
}

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
    },
    status: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Message', Message);
