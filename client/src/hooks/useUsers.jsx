import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useUsers(user) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/dm/users',
            {params: {currentUSerId: user._id}},
            {headers: {'x-token': localStorage.getItem('token')}}
        ).then((response) => {
            setUsers(response.data.users)
        }).catch(error => navigateTo('/'))

        return () => {
            setUsers([])
        }
    }, [])

    return [users, setUsers]
}