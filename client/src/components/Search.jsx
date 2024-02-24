import { useState, useContext } from "react"
import axios from "axios"
import selectUserForMessageContext from "../context/selectUserForMessageContext"

export default function Search () {
    const {selectedUserMessages} = useContext(selectUserForMessageContext)

    const [users, setUsers] = useState([])

    let user = JSON.parse(localStorage.getItem('user'))
    
    const searchUsers = async (e) => {
        if (!e.target.value) return setUsers([])
 
        let results =  await axios.get('http://localhost:3000/dm/search/users',
            { params: {currentUser: user._id, text: e.target.value}},
            {Headers: {'x-token': localStorage.getItem('token')}})

        console.log(results.data)

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

            <div className="search-result">{
                users.length !== 0
                &&
                users.map((singleUser, i) => {
                    return (
                        <div key={i} className='single-search-result' onClick={() => selectUser(singleUser)}>{singleUser.user.name}</div>
                    )
                })
            }</div>
        </div>
    )
}