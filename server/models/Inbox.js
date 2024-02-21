const mongoose = require('mongoose')

const Inbox =  mongoose.Schema({
    users: { 
        type: Array,
        "default" : []
    },
    type: { 
        type: String,
        required : true,
    }
})

module.exports = mongoose.model('Inbox', Inbox);