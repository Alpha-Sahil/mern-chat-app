const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    timezone: {
        type: String,
    },
    socket_id: {
        type: String,
    },
}, {
    timeStamps: true
})

module.exports = mongoose.model('User', User);