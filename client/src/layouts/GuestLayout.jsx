import appLogo from '../assets/images/logo.png'
import Footer from "../components/Footer"
import Model from '../components/Model'
import MobileSideBar from '../components/MobileSideBar'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import { useState} from 'react'
import { Link } from "react-router-dom";
import '../css/index.css'

export default function GuestLayout({children}) {
    const [showSideBar, setShowSideBar] = useState('')

    const [showSignUpOrSignIn, setShowSignUpOrSignIn] = useState('')

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const close = () => {
        document.body.style.backgroundColor = '#fff'

        setShowSignUpOrSignIn('')
    }

    return(
        <>
            {
                showSignUpOrSignIn
                &&
                <Model closed={ close }>
                    { showSignUpOrSignIn === 'signup' && <SignUp registered={(() => close() )} /> }
                    { showSignUpOrSignIn === 'signin' && <SignIn logined={(() => close() )} /> }
                </Model>
            }
            <header>
                <div className="navigation">
                    <div className="navigation-icon">
                    <Link to="/">
                        <img src={appLogo} alt="Loading..." />
                    </Link>
                    </div>
                    <div className="search">
                        <input className="vampire-input" type="text" placeholder="Search..." />
                    </div>
                    <div className="navigation-sign-up">
                        {
                            user
                            &&
                            <Link to="/message" className="vampire-link">
                                <i className="fa-solid fa-message"></i>
                            </Link>
                        }
                        <div className="vampire-link" onClick={() => {
                            document.body.style.backgroundColor = '#0003'

                            setShowSignUpOrSignIn('signin')
                        }}>
                                <i className="fa-solid fa-user-plus"></i>
                        </div>

                        <div className="vampire-link" onClick={() => {
                            document.body.style.backgroundColor = '#0003'
                        
                            setShowSignUpOrSignIn('signup')
                        }}>
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </div>

                        <div className="mobile-vampire-link mobile-nav-icon" onClick={() => setShowSideBar(true)}>
                            <i className="fa-solid fa-bars"></i>
                        </div>
                        {
                            showSideBar && <MobileSideBar showSideBar={showSideBar} closed={() => setShowSideBar(false)}/>
                        }
                    </div>
                </div>
            </header>
                { children }
            <Footer />
        </>
    )
}