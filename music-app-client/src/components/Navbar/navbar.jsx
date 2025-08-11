import {Link} from 'react-router'
import '../Navbar/navbar.css'

const Navbar = () => {
    return(
        <nav className='navbar'>
        <div className='HomeLink'>
            <Link to="/">Home</Link>
        </div>
        <div className="links">
            <Link to="/playlists">Explore Playlists</Link>
            <Link to="/auth/sign-up">sign-up</Link>
        </div>
        </nav>
    )
    
}

export default Navbar