import { socket } from './Index'

export const emitterUserConnected = (userId) => {
    socket.emit('user:connected', userId)
}

export const listenerConnected = () => {
    socket.on('connect', () => {
        console.log('Sockets connected')
    });
}

export const listenerDisconnected = () => {
    socket.on('disconnect', () => {
        console.log('Sockets disconnected')
    });
}