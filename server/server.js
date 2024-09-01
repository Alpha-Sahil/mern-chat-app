const app = require('./index')
const { createServer } = require('node:http');
// const Socket = require('./sockets')
const Socket = require('./Sockets2')

const server = createServer(app)

Socket.initiate()

// const socketServer = new Socket()

Socket.io().attach(server)

server.listen(3000, () => {
    console.log('Server is running on port:3000')
})

// socketServer.initiateListeners()

// module.exports = socketServer.io