import { socket } from "./Index";
import useConversationMessages from "../hooks/useConversationMessages"

export const emitterSendMessage = (message) => {
    socket.emit('message:sent', message)
}

export const listenerRecievedSentMessages = () => {
}