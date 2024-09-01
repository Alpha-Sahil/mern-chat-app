import { useCallback, useEffect, useState, useMemo } from "react"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { conversationMessages } from '../redux/slices/conversation'
import { useCreateConversationMessageMutation, useCreateConversationMutation } from '../redux/apis/conversation'
import { listenerConnected } from '../sockets/connection'

const Message = () => {
    const { conversation: currentConversationFromUrl } = useParams();
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [createConversationMessage, { isLoading }] = useCreateConversationMessageMutation()
    const [ceateConversation, { isLoading: createConversationLoader }] = useCreateConversationMutation()
    const currentConversationUser = useSelector(state => state.conversation.currentConversationUser)
    const currentConversation = useSelector(state => state.conversation.currentConversation)
    const currentConversationMessages = useSelector(state => state.conversation.conversationMessages)

    const messages = useMemo(() => {
        return currentConversationMessages.map((conversation, i) => {
            return <div className={`chat-msg ${conversation.isOwner && 'owner'}`} key={ i }>
                <div className="chat-msg-profile">
                    <img className="chat-msg-img" src={`https://robohash.org/${conversation.profileImage}`} alt="" />
                    <div className="chat-msg-date">Message seen 1.22pm</div>
                </div>
                <div className="chat-msg-content">
                    <div className="chat-msg-text">{ conversation.message }</div>
                </div>
            </div>
        })
    }, [currentConversationMessages])
    const createMessage = useCallback(async () => {
        let body = {
            conversation: currentConversation._id,
            message: message,
            to: currentConversationUser._id
        }

        if (!currentConversation._id) {
            body.conversation = await ceateConversation({
                user: user._id,
                body: { currentConversationUser: currentConversationUser._id }
            })
        }

        let response = await createConversationMessage({user: user._id, conversation: body.conversation, body: body})
    })

    useEffect(() => {
        console.log(currentConversationUser._id)
        let conversation = Boolean(currentConversation?._id)
                            ? currentConversation._id
                            : currentConversationFromUrl

        dispatch(conversationMessages({ user: user._id, conversation: conversation }))
    
        listenerConnected()
    }, [currentConversationUser])

    return <div className="chat-area">
        <div className="chat-area-header">
            <div className="chat-area-title">CodePen Group</div>
            <div className="chat-area-group">
                <img className="chat-area-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
                <img className="chat-area-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="" />
                <img className="chat-area-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
                <span>+4</span>
            </div>
        </div>
        <div className="chat-area-main">
            {/* <div className="chat-msg">
                <div className="chat-msg-profile">
                    <img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
                    <div className="chat-msg-date">Message seen 1.22pm</div>
                </div>
                <div className="chat-msg-content">
                    <div className="chat-msg-text">Luctus et ultrices posuere cubilia curae.</div>
                </div>
            </div>
            <div className="chat-msg owner">
                <div className="chat-msg-profile">
                    <img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
                    <div className="chat-msg-date">Message seen 1.22pm</div>
                </div>
                <div className="chat-msg-content">
                    <div className="chat-msg-text">Sit amet risus nullam eget felis eget. Dolor sed viverra ipsum😂😂😂</div>
                </div>
            </div> */}
            { messages }
        </div>
        <div className="chat-area-footer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-video">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-paperclip">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
            <input type="text" placeholder="Type something here..." name="message" onChange={(e) => setMessage(e.target.value)} />
            <div style={{padding: '0 12px 0 0', cursor: 'pointer'}} onClick={createMessage}>
                <i className="fa-regular fa-paper-plane"></i>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smile">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up">
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
            </svg>
        </div>
    </div>
}

export default Message