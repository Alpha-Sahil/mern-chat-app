import { useEffect, useCallback, useState, useRef } from "react"
import { socket } from "../sockets/Index"
import { remoteOffer, setRemoteSocketId, setConversation } from "../redux/slices/webRTC"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Peer from '../services/peer'

const ToastCallingNotification = (props = {type: 'success'}) => {
    const navigateTo = useNavigate()
    const currentConversationUser = useSelector(state => state.conversation.currentConversationUser)
    const callingConversation = useSelector(state => state.webRTC.conversation)
    const remoteSocketId = useSelector(state => state.webRTC.remoteSocketId)
    const remoteCallOffer = useSelector(state => state.webRTC.remoteOffer)
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const [showToast, setShowToast] = useState(false) 
    const [durationTimeout, setDurationTimeout] = useState()
    const toast = useRef()
    const toastTimer = useRef()
    const closeToastBtn = useRef()
    let countdown

    // const openToast = (type = 'success') => {
    //     toast.current.classList = [type];
    //     toast.current.style.animation = "open 0.3s cubic-bezier(.47,.02,.44,2) forwards";
    //     toastTimer.current.classList.add("timer-animation");
        
    //     clearTimeout(countdown)
        
    //     countdown = setTimeout(() => {
    //         closeToast();
    //     }, 5000)
    // }
    
    const callAccepted = useCallback(async () => {
        setShowToast(false)

        navigateTo(`/conversations/${callingConversation._id}/video-call`)
        
        const answer = await Peer.getAnwser(remoteCallOffer)

        socket.emit('server:call:accepted', { to: remoteSocketId, answer: answer })

        // clearTimeout(durationTimeout)
    }, [callingConversation])

    const closeToast = useCallback(() => {
        setShowToast(false)

        dispatch(remoteOffer(null))

        dispatch(setRemoteSocketId(null))

        socket.emit('server:call:ended', { to: currentConversationUser._id })
    }, [currentConversationUser])

    useEffect(() => {
        socket.on('call:incoming', (data) => {
            dispatch(remoteOffer(data.offer))
            
            dispatch(setRemoteSocketId(data.socket))

            dispatch(setConversation(data.conversation))
            
            setShowToast(true)

            let timeout = setTimeout(() => {
                socket.emit('server:call:not-responded', {to: data.socket})
                
                closeToast()
            }, 30000);

            setDurationTimeout(timeout)            
        })

        return () => {
            // socket.emit('server:call:ended', { to: currentConversationUser._id })
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
                    <h4>Status</h4>
                    <p>{ props.message }Video Call</p>
                </div>

                <div className="anwer-call-container">
                    <div className="icon-wrapper toast-options" onClick={callAccepted}>
                        <i className="fa-solid fa-phone icon-color-answer"></i>
                        accept
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