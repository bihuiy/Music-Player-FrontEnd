import '../../styles/forms.css'
import './SignInForm.css'
import { useState, useContext } from 'react'
import {signIn } from '../../services/users'
import { Link, useNavigate } from 'react-router'
import { setToken, getUser } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

export default function SignUpForm(){
    const {setUser} = useContext(UserContext)

    const [formData, setformData] = useState({
        identifier: '',
        password: '',
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        setErrors({})
        e.preventDefault()
        try {
            const {data} = await signIn(formData)
            setToken(data.token)
            setUser(getUser())
            navigate("/")
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <form className="form" onSubmit={handleSubmit}>


            <label htmlFor="identifier">Username/Email</label>
            <input type="text" name='identifier' id='identifier' placeholder='username/email' value={formData.identifier} onChange={handleChange} />

            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' placeholder='********' value={formData.password} onChange={handleChange}/>

            {errors.message && <p className='error-message'>Please ensure your username/email and password are correct</p>}
            <button type="submit">Sign-In</button> 
            <Link to={"/user/sign-up"}>Don't have an account?</Link>
        </form>
    )
}