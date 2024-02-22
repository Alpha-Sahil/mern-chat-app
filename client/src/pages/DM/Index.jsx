import AppLayout from "../../layouts/AppLayout"
import selectUserForMessageContext from "../../context/selectUserForMessageContext"
import socket from "../../Socket.js"
import useUsers from "../../hooks/useUsers"
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";

export default function Index () {
    const navigateTo = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [users, setUsers] = useUsers(user)
    const [selectedUser, setSelectedUser] = useState([])
    const [messages, setMessages] = useState([])
    const [typedMessage, setTypedMessage] = useState('')
    const [currentInbox, setCurrentInbox] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [messageReceivedFrom, setmessageReceivedFrom] = useState([])
    const scrollToBottom = useRef(null)
    let controller;
    let headers = {'x-token': localStorage.getItem('token')}

    socket.on('connect', () => {
        socket.emit('user:update_socket_id', {
            email: user.email
        })
    })

    useEffect(() => {
        scrollToBottom.current.scrollTop = scrollToBottom.current.scrollHeight;
    }, [messages])

    const selectedUserMessages = (selectedUser) => {
        setIsLoading(true)

        setSelectedUser(selectedUser.user)

        setMessages([])

        if (controller) controller.abort()

        controller = new AbortController()

        axios.post(`http://localhost:3000/dm/users/${selectedUser.user._id}/messages`,
            { users: selectedUser.inbox._id },
            { signal: controller.signal,
                headers: headers 
            },
        ).then( (response) => {
            setCurrentInbox(selectedUser.inbox)

            setTimeout(() => {
                setMessages(response.data.messages)
                setIsLoading(false)
                setmessageReceivedFrom(false)
            }, 500)
        })
        .catch(error => console.log(error))
    }

    const sendMessage = async () => {
        let inbox

        if (!currentInbox.length) {
            inbox = await axios.post(`http://localhost:3000/inboxes/create`, {
                users: [user._id, selectedUser._id]
            }, {headers: headers})
        }

        let message = [{
            message: typedMessage,
            from: user._id,
            to: selectedUser._id,
            inbox: inbox.data.inbox,
        }]

        socket.emit('message:send', message[0])

        setMessages([...messages, ...message])

        setTypedMessage('')

        setCurrentInbox(inbox.data.inbox)
    }

    socket.on('message:recived', (data) => {        
        setmessageReceivedFrom(data[0].from)

        let newMessages = data[0].inbox === currentInbox._id
                            ? [...messages, ...data]
                            : messages

        setMessages(newMessages)
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if (typedMessage) sendMessage()
    }

    return(
        <selectUserForMessageContext.Provider value={{ selectedUserMessages }} >
            <AppLayout>
                <section>
                    <div className="main-container">
                        <div className="dm-container">
                            <div className="user-container">
                                {users.map((singleUser, i) => {
                                    return <div key={i} className="list-container" onClick={ () => selectedUserMessages(singleUser)}>
                                        <div className="profile-name">{ singleUser.user.name }</div>
                                        <div>{
                                            (messageReceivedFrom === singleUser.user._id)
                                            &&
                                            <i className="fa-solid fa-circle-dot"></i>
                                        }</div>
                                    </div>
                                })}
                            </div>
                            <div className="message-container">
                                <div className="heading-message">
                                    <h2>
                                        {selectedUser.name} <br />
                                        {
                                            isLoading && <i className="fa-solid fa-hurricane fa-spin"></i>
                                        }
                                    </h2> 
                                </div>
                                <div className="message-box-main" ref={scrollToBottom}>
                                    {messages.map((message, j) => {
                                        return <div className={`single-message-box ${ message.from == user._id ? 'another-user' : 'current'}`} key={j}>
                                            <div className="vampire-link">
                                                <i className="fa-regular fa-user"></i>
                                            </div>
                                            <div className="main-message">
                                                {message.message}
                                            </div>
                                        </div>
                                    })}
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="message-user-dm">
                                        <div className="message-user-dm-container">
                                            <textarea
                                                className="vampire-dm-input"
                                                rows="2"
                                                value={typedMessage}
                                                onChange={e => setTypedMessage(e.target.value)}></textarea>
                                        </div>
                                        <button type="submit" role="button" className="vampire-link">
                                            <i className="fa-regular fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="profile-container"></div>
                        </div>
                    </div>
                </section>
            </AppLayout>
        </selectUserForMessageContext.Provider>
    )
}