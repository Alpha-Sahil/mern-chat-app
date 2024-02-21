import axios from 'axios';
import { useState } from 'react';
import  { useForm }  from  "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SignUp ({ registered }) {
    const navigateTo = useNavigate()

    const [showLoading, setShowLoading] = useState(false)

    const { register, handleSubmit, formState:{errors} } = useForm();

    const submit = (data) => {
        setShowLoading(true)

        axios.post('http://localhost:3000/register', {
            data: data
        }).then((response) => {
            localStorage.setItem('token', response.data.token)

            localStorage.setItem('user', JSON.stringify(response.data.user))

            registered()

            navigateTo('/message')
        })
    }

    return (
        <>
            <h1>Sign Up on Vampire chat</h1>
            <label htmlFor="">Use your credential to sign in</label>

            <form onSubmit={handleSubmit(submit)}>
                <div className="signup-form-container">
                    <div className="form-input">
                        <input type="text"  {...register("name", { required: 'The name field is required'})}/>
                        <i className="fa-solid fa-user icon"></i>
                        {errors.name && <small><p> {errors.name.message} </p></small>}
                    </div>

                    <div className="form-input">
                        <input type="email" {...register("email", { required: 'The email field is required', pattern: /^\S+@\S+$/i })} />
                        <i className="fa-solid fa-envelope icon"></i>
                        {errors.email && <small><p> {errors.email.message} </p></small>}
                    </div>

                    <div className="form-input">
                        <input type="number"  {...register("phone", { required: 'The phone number field is required'})} />
                        <i className="fa-solid fa-phone icon"></i>
                        {errors.phone && <small><p> {errors.phone.message} </p></small>}
                    </div>

                    <div className="form-input">
                        <input type="password" {...register('password', { required: 'The password field is required' })} />
                        <i className="fa-solid fa-key icon"></i>
                        {errors.password && <small><p> {errors.password.message} </p></small>}
                    </div>

                    <div className="form-input">
                        <input type="password" {...register('confirmPassword', { required: 'The confirm password field is required' })} />
                        <i className="fa-solid fa-check-double icon"></i>
                        {errors.confirmPassword && <small><p> {errors.confirmPassword.message} </p></small>}
                    </div>

                    <div className="form-button">
                        <button className="chatting-button" type="submit">
                            <span>
                                Sign in &nbsp;
                                {showLoading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}