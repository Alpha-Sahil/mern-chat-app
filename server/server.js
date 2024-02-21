require('dotenv').config()
const app = require('./index')
const { onConnection } = require('./services/Sockets')
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const options = {
    cors: {
        origin: "http://localhost:5173"
    }
}
const PORT = process.env.PORT || 3000
const server = createServer(app)
const io = new Server(server, options)

io.on('connection', onConnection);

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})