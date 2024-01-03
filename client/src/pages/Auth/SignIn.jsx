export default function SignIn() {
    return(
        <>
            <h1>Sign Ip on Vampire chat</h1>
            <label>Use your credential to sign in</label>
            
            <div className="signup-form-container">
                <div className="form-input">
                    <input type="text" name="email" id="email" placeholder="Email" />
                    <i className="fa-solid fa-envelope icon"></i>
                </div>
                <div className="form-input">
                    <input type="password" name="password" id="password" placeholder="Password" />
                    <i className="fa-solid fa-key icon"></i>
                </div>
                <div className="form-button">
                    <button className="chatting-button">
                        Sign in
                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                    </button>
                </div>
            </div>
        </>
    )
}