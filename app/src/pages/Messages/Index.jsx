import MessageHeader from './MessageHeader';
import MessageList from './List'
import SendMessage from './SendMessage';
import { useEffect } from "react"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { conversationMessages } from '../../redux/slices/conversation'
import { listenerConnected, emitterUserConnected } from '../../sockets/connection'

const Message = () => {
    const { conversation: currentConversationFromUrl } = useParams();
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const currentConversationUser = useSelector(state => state.conversation.currentConversationUser)
    const currentConversation = useSelector(state => state.conversation.currentConversation)

    useEffect(() => {
        let conversation = Boolean(currentConversation?._id)
                            ? currentConversation._id
                            : currentConversationFromUrl

        dispatch(conversationMessages({ user: user._id, conversation: conversation }))        
    }, [currentConversationUser])

    listenerConnected()

    emitterUserConnected(user._id)

    return <div className="chat-area">
        <MessageHeader />
        
        <MessageList />

        <SendMessage />
    </div>
}

export default Message