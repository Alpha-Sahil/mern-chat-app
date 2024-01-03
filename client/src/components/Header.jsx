import appLogo from '../assets/images/logo.png'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import Model from './Model'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


export default function Header () {
  const [showSignUpOrSignIn, setShowSignUpOrSignIn] = useState('')

//   useEffect(() => setShowSignUpOrSignIn((showSignUpOrSignIn) => showSignUpOrSignIn = ''));

    return(
        <>
            {
                showSignUpOrSignIn
                &&
                <Model closed={ () => setShowSignUpOrSignIn( (showSignUpOrSignIn) => showSignUpOrSignIn = '') }>
                    { showSignUpOrSignIn === 'signup' && <SignUp /> }
                    { showSignUpOrSignIn === 'signin' && <SignIn /> }
                </Model>
            }

            <header>
                <div className="navigation">
                    <div className="navigation-icon">
                        <img src={appLogo} alt="Loading..." />
                    </div>
                    <div className="search">
                        <input className="vampire-input" type="text" placeholder="Search..." />
                    </div>
                    <div className="navigation-sign-up">
                        <Link to="/message" className="vampire-link">
                            <i className="fa-solid fa-message"></i>
                        </Link>
                        <div className="vampire-link" onClick={() => setShowSignUpOrSignIn((showSignUpOrSignIn) => showSignUpOrSignIn = 'signin')}>
                            <div>
                                <i className="fa-solid fa-user-plus"></i>
                            </div>
                        </div>
                        <div className="vampire-link" onClick={() => setShowSignUpOrSignIn((showSignUpOrSignIn) => showSignUpOrSignIn = 'signup')}>
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}