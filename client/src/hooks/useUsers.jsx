import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useUsers(user) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/dm/users', {
            headers: {'x-token': localStorage.getItem('token')}
        }).then( (response) => {
            setUsers(response.data.users.filter(singleUSer => singleUSer._id !== user._id))
        }).catch(error => navigateTo('/'))


        return () => {
            setUsers([])
        }
    }, [])

    return [users, setUsers]
}