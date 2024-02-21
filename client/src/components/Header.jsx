import appLogo from '../assets/images/logo.png'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import Model from './Model'
import Search from "./Search"
import { useState} from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header () {
    const navigator = useNavigate()

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
                    { showSignUpOrSignIn === 'signin' && <SignIn logined={(() => close('') )} /> }
                </Model>
            }

            <header>
                <div className="navigation">
                    <div className="navigation-icon">
                    <Link to="/">
                        <img src={appLogo} alt="Loading..." />
                    </Link>
                    </div>
                    {/* <div className="search">
                        <input className="vampire-input" type="text" placeholder="Search..." />
                        <div className="search-result">
                            <div className='single-search-result'>user one</div>
                            <div className='single-search-result'>user two</div>
                            <div className='single-search-result'>user three</div>
                        </div>
                    </div> */}
                    <Search />
                    <div className="navigation-sign-up">
                        <Link to="/message" className="vampire-link">
                            <i className="fa-solid fa-message"></i>
                        </Link>
                        <div className="vampire-link">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="vampire-link" onClick={() => {
                            setUser('')
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')

                            navigator('/')
                        }}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}