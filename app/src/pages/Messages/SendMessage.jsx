import EmojiPicker from 'emoji-picker-react';
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useRef,useState} from "react"
import { useSelector } from "react-redux"
import { useCreateConversationMessageMutation, useCreateConversationMutation } from '../../redux/apis/conversation'
import { addToConversationMessages } from '../../redux/slices/conversation'
import { socket } from '../../sockets/Index'

const SendMessage = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
    const [message, setMessage] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const sendMessageInput = useRef('')
    const [createConversationMessage, { isLoading }] = useCreateConversationMessageMutation()
    const [ceateConversation, { isLoading: createConversationLoader }] = useCreateConversationMutation()
    const currentConversationUser = useSelector(state => state.conversation.currentConversationUser)
    const currentConversation = useSelector(state => state.conversation.currentConversation)

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

        if (response.data.createdMessage) dispatch(addToConversationMessages(response.data.createdMessage))

        setMessage('')

        setShowEmoji(false)
    })
    
    const addImageToMessage = (event, emojiObject) => {
        setMessage(`${sendMessageInput.current.value}${event.emoji}`)
    }

    useEffect(() => {
        socket.on('message:sent', (data) => {
            dispatch(addToConversationMessages(JSON.parse(data)))
        })

        return () => {
            socket.off('message:sent')
        }
    }, [])

    return <>
        {
            showEmoji &&
            <div className="emoji-container">
                <EmojiPicker
                    pickerStyle={{ width: "100%" }}
                    onEmojiClick={addImageToMessage} />
            </div>
        }
        <div className="chat-area-footer">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-video">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
            </svg> */}

            <div className='send-message-icon' onClick={() => setShowEmoji(!showEmoji)}>
                <i className="fa-regular fa-face-smile"></i>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-paperclip">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
            <input
                ref={sendMessageInput}
                value={ message }
                type="text"
                placeholder="Type something here..."
                name="message"
                onChange={(e) => setMessage(e.target.value)} />

            <div className='send-message-icon' onClick={createMessage}>
                <i className="fa-regular fa-paper-plane"></i>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up">
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
            </svg>
        </div>
    </>
}

export default SendMessage