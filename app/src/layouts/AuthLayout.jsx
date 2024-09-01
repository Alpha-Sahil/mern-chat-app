import { useEffect } from 'react'

const AuthLayout = (props) => {
    useEffect(() => { import('../css/auth.css') }, [])

    return <div className="wrapper fadeInDown">
    <div id="formContent">
        <h2 className="active"> {props.heading} </h2>

        <div className="fadeIn first">
            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
        </div>
        
        { props.children }

        { props.showForgotPassowrd && <div id="formFooter">
            <a className="underlineHover" href="#">Forgot Password?</a>
        </div> }
    </div>
</div>
}

export default AuthLayout