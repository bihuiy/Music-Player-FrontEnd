import './sign-in.css'
import SignInForm from '../../../sign-in-form/sign-in-form.jsx'
import { useContext } from 'react'
import { UserContext } from '../../../../contexts/userContext.jsx'
import { Navigate } from 'react-router'

export default function SignInPage(){
    const {user} = useContext(UserContext)
    if (user) return <Navigate to="/" />

    return(
        <main>
            <section className="form-section">
                <h1>Sign-In</h1>
                <SignInForm />
            </section>
        </main>
    )
}