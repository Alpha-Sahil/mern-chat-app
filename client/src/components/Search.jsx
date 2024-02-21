import { useState, useContext } from "react"
import axios from "axios"
import selectUserForMessageContext from "../context/selectUserForMessageContext"

export default function Search () {
    const {selectedUser, setSelectedUser, selectedUserMessages} = useContext(selectUserForMessageContext)

    const [users, setUsers] = useState([])
    
    const searchUsers = async (e) => {
        if (!e.target.value) return setUsers([])
 
        let results =  await axios.get('http://localhost:3000/dm/search/users',
            { params: {text: e.target.value}},
            {Headers: {'x-token': localStorage.getItem('token')}})

        setUsers(results.data.users)
    }

    const selectUser = (user) => {
        selectedUserMessages(user)

        setUsers([])
    }

    return (
        <div className="search">
            <input
                onInput={searchUsers}
                className="vampire-input"
                type="text"
                placeholder="Search..." />

            {
                users.length !== 0
                &&
                users.map((singleUser, i) => {
                    return (<div className="search-result" key={i}>
                        <div className='single-search-result' onClick={() => selectUser(singleUser)}>{singleUser.name}</div>
                    </div>)
                })
            }
        </div>
    )
}