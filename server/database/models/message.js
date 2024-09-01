const mongoose = require('mongoose');
const { Schema } = mongoose;

const message = new mongoose.Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'conversation'
    }
}, { timestamps: true });

module.exports = mongoose.model('message', message);