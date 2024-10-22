import Peer from "../../../services/peer"
import ReactPlayer from 'react-player'
import { socket } from '../../../sockets/Index'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useVideoCallMutation } from '../../../redux/apis/webRTC'
import { setCallStatus } from "../../../redux/slices/webRTC"

const VideoCall = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
    const [localStream, setLocalStream] = useState(null)
    const [testLocalStream, setTestLocalStream] = useState(null)
    const [showLoading, setShowLoading] = useState(true)
    const [remoteStream, setRemoteStream] = useState()
    const callStatus = useSelector(state => state.webRTC.callStatus)
    const currentConversationUser = useSelector(state => state.conversation.currentConversationUser)
    const remoteSocketId = useSelector(state => state.webRTC.remoteSocketId)
    const [videoCall, { isLoading }] = useVideoCallMutation()

    const callUser = useCallback(async () => {
        let response = await videoCall({
            to: currentConversationUser._id,
            offer: await Peer.getOffer(),
            from: user._id,
            conversation: currentConversationUser,
        })
    }, [])
    
    const startCamera = useCallback(async () => {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            })

            setLocalStream(stream)

        } catch (error) {
            console.log(error)
        }
    }, [localStream])

    const closeCamera = useCallback(async () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            
            setLocalStream(null);
        }
    }, [localStream])

    const endCall = () => {
        // socket.emit('call:ended', { to: currentConversationUser._id})
    }

    const handleCallAccepted = useCallback( async () => {
        changeCallStatusAndHideLoading('connecting...', true)

        await startCamera()

        console.log(localStream)

        sendStreams()
    }, [localStream])

    const sendStreams = useCallback((data = null) => {
        if (data) Peer.setRemoteLocation(data.answer)

        console.log(localStream)

        localStream.getTracks().forEach((track) => Peer.peer.addTrack(track, localStream));
    }, [localStream])

    const changeCallStatusAndHideLoading = useCallback((status, showLoading = false) => {
        dispatch(setCallStatus(status))
        
        setShowLoading(showLoading)
    }, [])

    const handleCallNotResponded = useCallback(() => changeCallStatusAndHideLoading('Call Not Responded'))

    const handleCallEnded = useCallback(() => changeCallStatusAndHideLoading('Call Ended'), [])

    useEffect(() => {
        // socket.on('call:incoming', handleCallAccepted)
        socket.on('client:call:not-responded', handleCallNotResponded)
        socket.on('client:call:accepted', sendStreams)
        socket.on('client:call:ended', handleCallEnded)

        return () => {
            socket.off('call:incoming')
            socket.off('client:call:not-responded')
            socket.off('client:call:accepted')
            socket.off('client:call:ended')
        }
    }, [socket])

    useEffect(() => {
        if (!localStream) {
            startCamera()

            if (remoteSocketId) handleCallAccepted()
    
            else callUser()
        }

        return () => {
            endCall()
            closeCamera()
        }
    }, [localStream])

    return <>
        {Boolean(localStream)}
        {
            showLoading
            &&
            <div className="demo-container">
                <div className="progress-bar">
                    <div className="progress-bar-value"></div>
                </div>
            </div>
        }
        <div className="call-status-container">
            {
                showLoading
                &&
                <div className="calling-loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            }
            <div>
                {callStatus}
            </div>
        </div>
        <div className="video-calling-container">
            <div className="video-calling-inner-container">
                <div className="video-calling-box">
                    <div className="video">
                        <div className="remote-video">
                            {
                                remoteStream
                                &&
                                <ReactPlayer
                                    playing
                                    height="100%"
                                    width="100%"
                                    url={remoteStream} /> 
                            }
                        </div>
                        <div className="self-video">
                            {
                                localStream
                                &&
                                <ReactPlayer
                                    playing
                                    height="100%"
                                    width="100%"
                                    url={localStream} />
                            }
                        </div>
                    </div>

                    <div className="video-calling-operations">
                        <div className="operations">
                            <div className="micro-phone-button operations-button">
                                <i className="fa-solid fa-microphone"></i>
                            </div>

                            <div className="call-end-button operations-button">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default VideoCall