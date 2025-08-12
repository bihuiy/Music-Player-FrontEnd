import {Link} from 'react-router'
import '../Navbar/navbar.css'
import {UserContext} from '../../contexts/userContext'

const Navbar = () => {
    const user = useContext (userContext)

    return(
        <nav className='navbar'>
        <div className='HomeLink'>
            <Link to="/">Home</Link>
        </div>
        <div className="links">
            <Link to="/playlists">Explore Playlists</Link>
            <Link to="/user/sign-up">sign-up</Link>
            <Link to="/user/sign-in">sign-in</Link>
        </div>
        </nav>
    )
    
}

export default Navbar