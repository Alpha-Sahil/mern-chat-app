import AuthLayout from '../../layouts/AuthLayout'
import { createUser } from '../../redux/slices/auth'
import { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from '../../redux/apis/auth'

const Register = () => {
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const [register, { isLoading }] = useRegisterMutation()
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({ name: '', email: '', password: ''})
    const errorList = useMemo(() => {
        return errors.map((error, i) => {
                return <div key={i}>
                    <small className='error-list'> { i + 1 } { error.msg }</small>
                    <br />
                </div>
            })
    }, [errors])
    const updateForm = useCallback((e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }, [form])
    const submit = useCallback(async (e) => {
        e.preventDefault()

        let response = await register(form)

        if (response.data.errors?.length) setErrors(response.data.errors)

        else {
            dispatch(createUser(response.data.user))      
            
            navigateTo('/')
        }
    }, [form])

    return <AuthLayout showForgotPassowrd={ false } heading="Register">
        { errorList }
        <form>
            <input type="text" className="fadeIn second" name="name" placeholder="Name" onChange={updateForm} />
            <input type="text" className="fadeIn second" name="email" placeholder="Email" onChange={updateForm} />
            <input type="text" className="fadeIn third" name="password" placeholder="password" onChange={updateForm} />
            <button className='app-button' role="button" onClick={submit}>
                <span className='button-spinner'>
                    Register
                    { isLoading && <div className="spinner" style={{ width: '30px', height: '30px' }}></div>}
                </span>
            </button>
        </form>
    </AuthLayout>
}

export default Register