import { useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"

const List = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const chatArea = useRef()
    const currentConversationMessages = useSelector(state => state.conversation.conversationMessages)

    const messages = useMemo(() => {
        return <div className="chat-area-main" ref={ chatArea }>
            {
                currentConversationMessages.map((conversation, i) => {
                    return <div className={`chat-msg ${conversation.from._id === user._id&& 'owner'}`} key={ i+1 }>
                        <div className="chat-msg-profile">
                            <img className="chat-msg-img" src={`https://robohash.org/${conversation.from.profileURL}`} alt="" />
                            <div className="chat-msg-date">Message seen 1.22pm</div>
                        </div>
                        <div className="chat-msg-content">
                            <div className="chat-msg-text">{ conversation.message }</div>
                        </div>
                    </div>
                })
            }
        </div> 
    }, [currentConversationMessages])

    useEffect(() => {
        chatArea.current.scrollTo({ top: chatArea.current.scrollHeight, behavior: 'smooth' });
    }, [currentConversationMessages])

    return messages
}

export default List