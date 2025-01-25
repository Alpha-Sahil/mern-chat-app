import { useSelector } from "react-redux"

const MessageHeader = () => {
    const fetchingConversationMessages = useSelector(state => state.conversation.fetchingConversationMessages)
    const setCurrentConversationUser = useSelector(state => state.conversation.currentConversationUser)

    return <div className="chat-area-header">
        <div className="chat-area-title msg-loader">
            {setCurrentConversationUser?.name}
            {fetchingConversationMessages && <div className='spinner msg-name-loader-size'></div>}
        </div>
        <div className="chat-area-group">
            <img className="chat-area-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
            <img className="chat-area-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="" />
            <img className="chat-area-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
            <span>+4</span>
        </div>
    </div>
}

export default MessageHeader