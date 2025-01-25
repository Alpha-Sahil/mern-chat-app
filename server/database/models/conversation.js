const mongoose = require('mongoose');
const { Schema } = mongoose

const conversation = new mongoose.Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    lastMessage: {
        type: String,
    },
    type: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('conversation', conversation);