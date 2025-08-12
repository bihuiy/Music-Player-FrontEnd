import './sign-up-page.css'
import SignUpForm from '../../../sign-up-form/sign-up-form'
import { useContext } from 'react'
import { UserContext } from '../../../../contexts/userContext.jsx'
import { Navigate } from 'react-router'

export default function SignUpPage(){
    const {user} = useContext(UserContext)
    if (user) return <Navigate to="/" />
    
    return(
        <main>
            <section className="form-section">
                <SignUpForm />
            </section>
        </main>
    )
}