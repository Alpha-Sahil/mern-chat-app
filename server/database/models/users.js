const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    password: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
    },
    profile: {
        type: String,
    },
    timezone: String,
}, { timestamps: true });

module.exports = mongoose.model('user', user);