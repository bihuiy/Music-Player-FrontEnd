import './ErrorPage.css'
import { Link } from "react-router"

export default function ErrorPage({error}) {
    return(
        <main className="error-page">
            <h1>An Error Occurred :(</h1>
            <Link to='/'>Back to Home</Link>
        </main>
    )
}