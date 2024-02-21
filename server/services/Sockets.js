const User = require('../models/User')
const Message = require('../models/Message')
const Constant = require('../global/Constant')
const { use } = require('..')

const onConnection = (socket) => {
    console.log('sockets connected')

    socket.on('user:update_socket_id', async (user) => {
        let updatedUser = await User.findOneAndUpdate({ email: user.email}, {socket_id: socket.id})

        let messages = Message.find({ to: user }, { status: Constant.DRAFT_STATUS })

        socket.to(user.socket_id).emit('user:recived_pending_messages')
    })

    socket.on('message:send', async (data) => {
        let user = await User.find({ _id: data.to })

        let status = user[0].socket_id ? Constant.SENT_STATUS : Constant.DRAFT_STATUS

        let message = await Message.create({
            message: data.message,
            from: data.from,
            to: user[0],
            inbox: data.inbox,
            status: status,
        })

        if (status === Constant.SENT_STATUS) socket.to(user[0].socket_id).emit('message:recived', [message])
    })
}

module.exports = { onConnection }