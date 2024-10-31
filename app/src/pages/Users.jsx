import { useConversationsQuery } from '../redux/apis/conversation'
import { useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {
    setCurrentConversation as setCurrentConversationSlice,
    setCurrentConversationUser
} from '../redux/slices/conversation'

const Users = () => {
    const { conversation: currentConversationFromUrl } = useParams();
    const user = JSON.parse(localStorage.getItem('user')) ?? {}
    const currentConversation = useSelector(state => state.conversation.currentConversation)
    const dispatch = useDispatch()
    const { data, isLoading } = useConversationsQuery(user._id)
    const spinnerStyle = { width: '35px', height: '35px' }
    const setCurrentConversation = useCallback((conversation, user) => {
        history.pushState({}, null, `/conversations/${conversation._id}`)
        dispatch(setCurrentConversationSlice(conversation))
        dispatch(setCurrentConversationUser(user))
    }, [])

    const list = useMemo(() => {
        return  isLoading
            ? <div className='spinner-container'>
                <div className='spinner' style={ spinnerStyle }></div>
            </div>
            :  data.conversations.map((conversation, i) => {
                return <div className={`msg online ${Boolean(currentConversation?._id == conversation?._id) && 'active'}`}
                        key={ i }
                        onClick={ () => setCurrentConversation(conversation, conversation.conversationUser) }>
                    <img className="msg-profile" src={`https://robohash.org/${conversation.conversationUser.name}`} alt="" />
                    <div className="msg-detail">
                        <div className="msg-username">
                            <div className='msg-name-loader'>
                                { conversation.conversationUser.name }
                            </div>
                        </div>
                        <div className="msg-content">
                            <span className="msg-message">{ conversation.lastMessage }</span>
                            <span className="msg-date">20m</span>
                        </div>
                    </div>
                </div>
        })
    }, [isLoading, currentConversation])

    useEffect(() => {
        if (currentConversationFromUrl) {
            let conversation = data?.conversations?.filter(conversation => conversation._id.toString() === currentConversationFromUrl.toString())?.shift()
        
            dispatch(setCurrentConversationSlice(conversation))
    
            if (conversation) {
                let conversationUserFromUrl = conversation.users.filter(conversationUser => conversationUser._id.toString() !== user._id.toString())

                dispatch(setCurrentConversationUser(conversationUserFromUrl[0]))
            }
        }
    }, [isLoading])

    return <div className="conversation-area">
        { list }
        <button className="add"></button>
        <div className="overlay"></div>
    </div>
}

export default Users