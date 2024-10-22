import Header from '../components/Header';
import ToastCallingNotification from '../components/ToastCallingNotification'
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const AppLayout = () => {
    const [cookies, removeCookie] = useCookies([]);
    const navigateTo = useNavigate()

    useEffect(() => {
        if (!cookies.token) navigateTo('/login')
    }, [cookies])

    return <div className="app">
        <Header />

        <ToastCallingNotification />

        {cookies.token ? <Outlet /> : <Navigate to='/login' />}
    </div>
}

export default AppLayout