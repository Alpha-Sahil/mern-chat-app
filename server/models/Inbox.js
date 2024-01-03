const mongoose = require('mongoose')

const Inbox =  mongoose.Schema({
    users: { 
        type: Array,
        "default" : []
    }
})

module.exports = mongoose.model('Inbox', Inbox); 