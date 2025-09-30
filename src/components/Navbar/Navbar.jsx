import { Link } from "react-router";
import "./Navbar.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { removeToken } from "../../utils/auth";
import { GiMusicSpell } from "react-icons/gi";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
    removeToken();
    setUser(null);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          Amplify
          <GiMusicSpell />
        </Link>
      </div>
      <div className="links">
        <Link to="/playlists">Explore Playlists</Link>
        <Link to="/songs">Explore Songs</Link>
        {user ? (
          <>
            <Link to="/playlists/create-playlist">Create a Playlist</Link>
            <button
              type="button"
              className="signout-btn"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <Link to={`/user/${user._id}/profile`}>{`${user.username}`}</Link>
          </>
        ) : (
          <>
            <Link to="/user/sign-up" className="nav-btn">
              Sign up
            </Link>
            <Link to="/user/sign-in" className="nav-btn">
              Sign in
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
