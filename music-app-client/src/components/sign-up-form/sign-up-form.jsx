import './Sign-up-form.css'
import '../../styles/forms.css'
import { useState, useContext } from 'react'
import { signUp } from '../../services/users'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { setToken, getUser } from '../../utils/auth'
import ImageUploadField from '../ImageUploadField/ImageUploadField'
import { Link } from 'react-router'

export default function SignUpForm(){
    const {setUser} = useContext(UserContext)


    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        profileImage: ''
    })
    const [errors, setErrors] = useState({})
    const [isUploading, setIsUploading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const {data} = await signUp(formData)
            setToken(data.token)
            setUser(getUser())
            navigate("/")
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const setProfileImage = (url) =>{
        setFormData({...formData, profileImage: url})
    }
    

    return(
        <form className="form" onSubmit={handleSubmit}>
            <h1> Create an Account</h1>

            <ImageUploadField image="ProfileImage" setImage ={setProfileImage} imageUrl={formData.profileImage} setIsUploading={setIsUploading}/>

            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' placeholder='user@example.co.uk' value={formData.email} onChange={handleChange}/>
            {errors.email && <p className='errorMessage'>{errors.email}</p>}

            <label htmlFor="username">Username</label>
            <input type="text" name='username' id='username' placeholder='username' value={formData.username} onChange={handleChange} />
            {errors.username && <p className='errorMessage'>{errors.username}</p>}

            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' placeholder='********' value={formData.password} onChange={handleChange}/>
            {errors.password && <p className='errorMessage'>{errors.password}</p>}

            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input type="password" name='passwordConfirmation' id='passwordConfirmation' placeholder='confirm password' value={formData.passwordConfirmation} onChange={handleChange}/>
            {errors.passwordConfirmation && <p className='errorMessage'>{errors.passwordConfirmation}</p>}

            <button type="submit" disabled={isUploading}>{isUploading ? 'uploading...' : 'Sign-up'}</button>
            <Link to={"/user/sign-in"}>Already have an account?</Link>
        </form>
    )
}