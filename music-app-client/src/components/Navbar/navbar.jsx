import {Link} from 'react-router'
import '../Navbar/navbar.css'
import {useContext} from 'react'
import {UserContext} from '../../contexts/userContext'

const Navbar = () => {
    const {user, setUser} = useContext (UserContext)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return(
        <nav className='navbar'>
        <div className='HomeLink'>
            <Link to="/">Home</Link>
        </div>
        <div className="links">
            <Link to="/playlists">Explore Playlists</Link>
            {user?
                <button type='button' className='signout-btn' onClick={handleSignOut}>Sign Out</button>
                :(
                    <>
                    <Link to="/user/sign-up">sign-up</Link>
                    <Link to="/user/sign-in">sign-in</Link>
                    </>
                )
            }
            
        </div>
        </nav>
    )
    
}

export default Navbar