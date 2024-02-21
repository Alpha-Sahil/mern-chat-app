import axios from 'axios';
import  { useForm }  from  "react-hook-form";
import { useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function SignIn({logined}) {
    const navigateTo = useNavigate()

    const [showLoading, setShowLoading] = useState(false)

    const { register, handleSubmit, formState:{errors} } = useForm();

    const submit = (data) => {
        setShowLoading(true)

        axios.post('http://localhost:3000/login', {
            data: data
        }).then((response) => {
            setShowLoading(false)

            localStorage.setItem('token', response.data.token)

            localStorage.setItem('user', JSON.stringify(response.data.user))

            logined()

            navigateTo('/message')
        })
    }

    return(
        <>
            <h1>Sign Ip on Vampire chat</h1>
            <label>Use your credential to sign in</label>
            
            <form onSubmit={handleSubmit(submit)}>
                <div className="signup-form-container">
                    <div className="form-input">
                        <input type="email" {...register("email", { required: 'The email field is required', pattern: /^\S+@\S+$/i })} />
                        <i className="fa-solid fa-envelope icon"></i>
                        {errors.email && <small><p> {errors.email.message} </p></small>}
                    </div>
                    <div className="form-input">
                        <input type="password" {...register('password', { required: 'The password field is required' })} />
                        <i className="fa-solid fa-key icon"></i>
                        {errors.password && <small><p> {errors.password.message} </p></small>}
                    </div>
                    <div className="form-button">
                        <button className="chatting-button">
                            <span>
                                Sign in &nbsp;
                                {
                                    showLoading && <i className="fa-solid fa-circle-notch fa-spin"></i>
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}