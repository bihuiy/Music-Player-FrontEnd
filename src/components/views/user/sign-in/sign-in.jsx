import './Sign-in.css'
import SignInForm from "../../../Sign-in-form/Sign-in-form.jsx"
import { useContext } from 'react'
import { UserContext } from '../../../../contexts/UserContext.jsx'
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