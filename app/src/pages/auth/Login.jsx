import AuthLayout from '../../layouts/AuthLayout'
import { useDispatch } from 'react-redux'
import { useCallback, useMemo, useState } from 'react'
import { useLoginMutation } from '../../redux/apis/auth'
import { createUser as createUserState } from '../../redux/slices/auth'

const Login = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState([])
    const [login, { isLoading }] = useLoginMutation()
    const errorList = useMemo(() => {
        return errors.map((error, i) => {
                return <div key={i}>
                    <small className='error-list'> { i + 1 } { error.msg }</small>
                    <br />
                </div>
            })
    }, [errors])
    const submit = useCallback(async (e) => {
        e.preventDefault()

        let response = await login(form)

        if (response.data.errors?.length) setErrors(response.data.errors)

        else {
            localStorage.setItem('user', JSON.stringify(response.data.user))

            dispatch(createUserState(response.data.user))

            window.location.replace('http://localhost:5173');
        }
    }, [form])
    const updateForm = useCallback((e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }, [form])

    return <AuthLayout showForgotPassowrd={ true } heading="Login">
        { errorList }
        <form>
            <input type="email" className="fadeIn second" name="email" placeholder="Email" onChange={updateForm} />
            <input type="text" className="fadeIn third" name="password" placeholder="Password" onChange={updateForm} />
            <button className='app-button' role="button" onClick={submit}>
                <span className='button-spinner'>
                    Log In { isLoading && <div className="spinner" style={{ width: '30px', height: '30px' }}></div>}
                </span>
            </button>
        </form>
    </AuthLayout>
}

export default Login