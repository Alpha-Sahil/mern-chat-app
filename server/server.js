const app = require('./index')
const { createServer } = require('node:http');
const Socket = require('./Sockets2')
const hostname = '0.0.0.0'; 

const server = createServer(app)

Socket.initiate()

Socket.io().attach(server)

server.listen(3000, hostname, () => {
    console.log('Server is running on port:3000')
})