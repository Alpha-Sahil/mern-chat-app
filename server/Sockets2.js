const { Server } =  require("socket.io");
let _io
let _onlineUsers = []

const io = () => {
    return _io
}

const initiate = () => {
    const options = { cors: { origin: "http://localhost:5173" } }

    _io = new Server(options)

    _io.on('connection', (socket) => {
        console.log('Socket Connected')

        socket.on('user:connected', (userId) => {
            _onlineUsers[userId] = socket.id
        })

        socket.on('call:incoming', (data) => {
            if (_onlineUsers.hasOwnProperty(data.to)) {
                _io.to(_onlineUsers[data.to]).emit('call:incoming', {offer: data.offer})
            }
        })
    })
}

const sendMessage = (to, message) => {
    _io.to(_onlineUsers[to]).emit('message:sent', message)
}

module.exports = {
    _io,
    _onlineUsers,
    io,
    initiate,
    sendMessage
}