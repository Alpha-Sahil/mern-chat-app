import { useEffect, useCallback, useState, useRef } from "react"
import { socket } from "../sockets/Index"
import { remoteOffer, setRemoteSocketId, setConversation, setCallingData } from "../redux/slices/webRTC"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useCallEndedMutation, useCallNotRespondedMutation, useCallAcceptedMutation} from '../redux/apis/webRTC'
import Peer from '../services/peer'

const ToastCallingNotification = (props = {type: 'success'}) => {
    const navigateTo = useNavigate()
    const currentConversationUser = useSelector(state => state.conversation.currentConversationUser)
    const currentConversation = useSelector(state => state.conversation.currentConversation)
    const callingConversation = useSelector(state => state.webRTC.conversation)
    const remoteSocketId = useSelector(state => state.webRTC.remoteSocketId)
    const remoteCallOffer = useSelector(state => state.webRTC.remoteOffer)
    const callingData = useSelector(state => state.webRTC.callingData)
    const user = JSON.parse(localStorage.getItem('user'))
    const [callEnded, { isLoading: callEndedProcessing }] = useCallEndedMutation()
    const [callNotResponded, { isLoading: callNotRespondedProcessing }] = useCallNotRespondedMutation()
    const [callAcceptedApi, { isLoading: callAcceptedProcessing }] = useCallAcceptedMutation()
    const dispatch = useDispatch()
    const [showToast, setShowToast] = useState(false) 
    const [durationTimeout, setDurationTimeout] = useState()
    const toast = useRef()
    const toastTimer = useRef()
    const closeToastBtn = useRef()
    
    const callAccepted = useCallback(async () => {
        setShowToast(false)

        navigateTo(`/conversations/${callingConversation._id}/video-call`)
        
        const answer = await Peer.getAnwser(remoteCallOffer) 

        await callAcceptedApi({
            from: user._id,
            conversation: callingData.conversation._id,
            to: callingData.from,
            answer: answer
        })

        clearTimeout(durationTimeout)
    }, [callingConversation])

    const closeToast = useCallback(async () => {
        setShowToast(false)

        dispatch(remoteOffer(null))

        dispatch(setRemoteSocketId(null))

        await callEnded({ from: user._id, to: currentConversationUser._id })
    }, [currentConversationUser])

    useEffect(() => {
        socket.on('call:incoming', (data) => {
            dispatch(remoteOffer(data.offer))
            
            dispatch(setRemoteSocketId(data.socket))

            dispatch(setConversation(data.conversation))

            dispatch(setCallingData(data))

            setShowToast(true)

            let timeout = setTimeout(async () => {
                await callNotResponded({from: user._id, conversation: data.conversation._id, to: data.from})
                
                closeToast()
            }, 30000);

            setDurationTimeout(timeout)            
        })

        return () => {
            socket.off('call:incoming')
            socket.off('call:ended')
        }
    }, [socket])

    return <>
    {
        showToast &&
            <section id="toast" className='success' ref={ toast }>
                <div id="icon-wrapper">
                    <i className="fa-solid fa-phone-volume icon-color-answer"></i>
                    {/* <div id="icon"></div> */}
                </div>

                <div id="toast-message">
                    <h4>{callingData.callingUser.name}</h4>
                    <p>Video Call</p>
                </div>

                <div className="anwer-call-container">
                    <div className="icon-wrapper toast-options" onClick={callAccepted}>
                        <i className="fa-solid fa-phone icon-color-answer"></i>
                    </div>

                    <div className="icon-wrapper toast-options" onClick={closeToast}>
                        <i className="fa-solid fa-phone-slash icon-color-reject"></i>
                    </div>
                </div>

                <button id="toast-close" ref={ closeToastBtn }></button>

                <div id="timer" ref={ toastTimer }></div>
            </section> 
        }
    </>
}

export default ToastCallingNotification