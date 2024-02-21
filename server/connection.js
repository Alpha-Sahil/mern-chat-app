const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/chatting')
    .then((response) => {
        console.log('Mongodb connected')
    })
    .catch(error => console.log('Error occured while connecting to mongodb ' + error));

module.exports = mongoose