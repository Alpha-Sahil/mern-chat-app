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
            if (_onlineUsers[data.to]) {
                _io.to(_onlineUsers[data.to]).emit('call:incoming', {
                    offer: data.offer,
                    socket: _onlineUsers[data.to],
                    conversation: data.conversation
                })
            }
        })

        socket.on('call:ended', (data) => {
            if (_onlineUsers[data.to]) {
                _io.to(_onlineUsers[data.to]).emit('call:ended')
            }
        })

        socket.on('server:call:not-responded', (data) => {
            if (data.to) {
                _io.to(data.to).emit('client:call:not-responded')
            }
        })

        socket.on('server:call:accepted', (data) => {
            if (data.to) {
                _io.to(data.to).emit('client:call:accepted', data)
            }
        })

        socket.on('server:call:ended', (data) => {
            if (_onlineUsers[data.to]) {
                _io.to(_onlineUsers[data.to]).emit('client:call:ended')
            } 
        })

        socket.on("server:peer:nego:needed", ({ to, offer }) => {
            _io.to(to).emit("client:peer:nego:needed", { from: socket.id, offer });
        });

        socket.on("server:peer:nego:done", ({ to, answer }) => {
            _io.to(to).emit("client:peer:nego:final", { from: socket.id, answer });
        });
    })
}

const sendMessage = (to, message) => {
    return _io.to(_onlineUsers[to]).emit('message:sent', message)
}

const callConversationUser = (data) => {
    return _io.to(_onlineUsers[data.to]).emit('call:incoming', {
        offer: data.offer,
        socket: _onlineUsers[data.from],
        conversation: data.conversation
    })
}

module.exports = {
    _io,
    io,
    _onlineUsers,
    initiate,
    sendMessage,
    callConversationUser
}