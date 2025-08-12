import './sign-in.css'
import SignInForm from '../../../sign-in-form/sign-in-form.jsx'

export default function SignInPage(){
    return(
        <main>
            <section className="form-section">
                <h1>Sign-In</h1>
                <SignInForm />
            </section>
        </main>
    )
}