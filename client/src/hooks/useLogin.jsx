import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function useLogin () {
    const navigateTo = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user'))  navigateTo('/message')
    }, [])
}