import { socket } from '../../sockets/Index'
import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import Peer from "../../services/peer"

const CallingButton = (props) => {
    const callingButton = useRef('')
    const currentConversationUser = useSelector(state => state.conversation.currentConversationUser)
    const [buttonTitle, setButtonTitle] = useState(props.title)

    const call = async () => {
        // callingButton.current.classList.add('blink-button')

        // setButtonTitle('Calling...')

        // socket.emit('call:incoming', {
        //     to: currentConversationUser._id,
        //     offer: await Peer.getOffer()
        // })
    }

    const handleIncomingCall = (data) => {
        console.log(data)
    }

    useEffect(() => {
        // socket.on('call:incoming', handleIncomingCall)
        
        return () => {
            // socket.off('call:incoming')
        }
    }, [socket])


    return <button ref={ callingButton } className="detail-button" onClick={call}>
        <i className={props.icon}></i>

        { buttonTitle }
    </button>
}

export default CallingButton