const { Server } =  require("socket.io");

class Socket {
    _io = Server

    static _onlineUsers = []

    constructor () {
        const options = { cors: { origin: "http://localhost:5173" } }

        this._io = new Server(options)
    }

    get io () {
        return this._io
    }

    initiateListeners () {
        const io = this.io

        io.on('connection', (socket) => {
            socket.on('user:connected', (userId) => {
                Socket._onlineUsers[userId] = socket.id
            })
        })
    }

    static sendMessage (to, message) {
        console.log(socket)

        Socket.io.to(Socket._onlineUsers[to]).emit('message:sent', message)
    }
}

module.exports = Socket